title: "Github Pages & Hexo 로 블로그 시작"
category:
  - Tech
toc: true
date: 2015-02-01
tags:
- Github Pages
- Hexo
---
### Github Pages 란?
[Github Pages](https://pages.github.com/)는 [git](http://git-scm.com/book/ko/v1)호스팅 서비스로 유명한 [Github](https://github.com/)에서 제공하는 무료 웹사이트 서비스다.
용량, 트레픽, 광고등의 제약도 없다. 커스텀 URL도 무료로 제공된다. 다만 서버쪽 처리나 데이터베이스등은 제공되지 않는다.

예를들어 유저의 웹사이트를 만들 경우 Github에 자신의 유저명을 포함한 `유저명.github.io` 라는 리포지토리를 만들고
그 리포지토리에 html, js, css, 이미지파일등을 올려놓으면 그 내용이 `http://유저명.github.io` 에 표시된다.

또한 표준으로 루비로 만들어진 [jekyll](http://jekyllrb.com/)를 이용하여 웹사이트나 블로그등을 보다 쉽게 관리할수 있는 기능도 제공한다.

### Hexo 란?
[Hexo](http://hexo.io/)는 [node.js](http://nodejs.org/)를 기반으로 만들어진 블로그 프레임워크다.
[Bootstrap](http://getbootstrap.com/)을 이용한 테마등 나름 다양한 [테마](https://github.com/hexojs/hexo/wiki/themes)가 제공된다.


### Github Pages & Hexo 로 하는 이유
가장 큰 이유는 [마크다운](http://ko.wikipedia.org/wiki/%EB%A7%88%ED%81%AC%EB%8B%A4%EC%9A%B4)을 사용하여 블로그를 작성하고 싶어서이다.
기존 티스토리의 경우 마크다운으로 작성하려 하면 결국 HTML로 수동 변환을 한후 작성해야하는데 [Github Pages](https://pages.github.com/)용 블로그 툴들은 대부분 마크다운을 지원하고 그 외에도 제한이 적은 느낌이다.
또한 루비기반의 [jekyll](http://jekyllrb.com/)나 [Octopress](http://octopress.org/)등 보다 유명하고 널리 사용되는 툴이 아닌 [Hexo](http://hexo.io/)를 선택한 이유는 [node.js](http://nodejs.org/)기반의 툴로 하고 싶다는 단순한 이유에서다.

참고로 [Static Site Generators](https://staticsitegenerators.net/)에서 각 언어별 정적 사이트 작성툴의 인기를 확인할 수 있다.

Github Pages & Hexo 조합으로 블로그를 운영할 경우 [git](http://git-scm.com/book/ko/v1), [Github](https://github.com/), [node.js](http://nodejs.org/), [Hexo](http://hexo.io/)등 개발관련 기반 지식이 필요하지만 기존 블로그 서비스들 보다 훨씬 자유로운 블로깅이 가능할듯 하다. 
