import { observable, computed, reaction, action } from 'mobx';
import lunr from 'lunr';
import oboe from 'oboe';

import data from './data.json';
import viewData from './viewData.json';

const lunrIdx = lunr(function() {
  this.field('title', { boost: 10 });
  this.field('content');
});

export default class {
  @observable articles = [];
  @observable indexedArticles = [];
  @observable articleLayouts = [];

  idx = null;

  constructor() {
    this.idx = lunrIdx;
    
    // this.articles = data.articles;
    this.articleLayouts = viewData.articles;

    oboe('https://s3-us-west-2.amazonaws.com/s.cdpn.io/138943/fake-blog-data.json')
      .path('articles.*', () => {
        //console.log('article founded, load should be done soon');
      })
      .node('articles.*', (article) => {
        // console.log('article loaded, show next line');
        this.articles.push(article);
      })
      .done((allArticles) => {
        this.articles.forEach(a => this.indexedArticles.push(a));

        const adjustedArticles = this.articles.map((article, index) => {
          const combinedContent = article.detail.reduce((previousValue, currentValue, currentIndex, array) => {
            let combined = previousValue;
            if (currentValue.content.kind === 'text') {
              combined = previousValue + '\n' + currentValue.content.data
            }

            return combined;
          }, "");

          return {
            title: article.title,
            content: combinedContent,
            id: index
          };
        });

        adjustedArticles.forEach(a => this.idx.add(a));
      });
  }

  @action
  filterIndexedArticle(keyPhrase) {
    // Fake filtering to resturn only one
    if (keyPhrase !== '') {
      const result = this.idx.search(keyPhrase);
      // console.log(result);
      if (result.length !== 0) {
        this.indexedArticles.length = 0;
        result.forEach(r => {
          const article = this.articles[r.ref];
          this.indexedArticles.push(article);
        });
      }
    } else {
      this.indexedArticles.length = 0;
      this.articles.forEach(a => this.indexedArticles.push(a));
    }
  }

  @action
  loadArticleContent(articleId) {
    const article = this.articles.find(a => a.id === articleId);

    article.detail.forEach(d => {
      if (d.content.kind === 'code') {
        if (d.content.subKind === 'gist') {
          if (d.content.fetchedData === '') {
            const path = 'https://api.github.com/gists/' + d.content.data.id;
            fetch(path)
              .then((response) => {
                // console.log(response);
                return response.json();
              })
              .then((dataJson) => {
                const convertedArray = Object.keys(dataJson.files).map(key => dataJson.files[key]);
                if (convertedArray !== undefined && convertedArray !== null) {
                  const [firstContent, ...tail] = convertedArray;
                  // const firstContent = _.head(convertedArray);
                  // console.log(firstContent);
                  if (firstContent !== undefined) {
                    // result = (<div><code>{firstContent.content}</code></div>);
                    d.content.language = firstContent.language;
                    d.content.fetchedData = firstContent.content;
                  }
                }
              })
              .catch((err) => {
                console.error(err.message);
              });
          }
        }
      }
    });
  }
};
