import { observable, computed, reaction, action } from 'mobx';

import data from './data.json';
import viewData from './viewData.json';

export default class {
  @observable articles = [];
  @observable articleLayouts = [];

  constructor() {
    this.articles = data.articles;
    this.articleLayouts = viewData.articles;
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
