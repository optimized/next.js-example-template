'use strict';

import React from 'react';
import Markdown from 'remarkable';
import Link from 'next/prefetch'



var Remarkable = React.createClass({

  getDefaultProps() {
    return {
      container: 'div',
      options: {}
    };
  }

  render() {

    var Container = this.props.container;

    return (
      <Container>
        {this.content()}
      </Container>
    );
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.options !== this.props.options) {
      this.md = new Markdown(nextProps.options);
    }
  }

  content() {

    if (this.props.source) {
      return <span id={this.props.id} dangerouslySetInnerHTML={{ __html: this.renderMarkdown(this.props.source) }} />;
    }
    else {
      return React.Children.map(this.props.children, child => {
        if (typeof child === 'string') {

          return <span id={this.props.id} dangerouslySetInnerHTML={{ __html: this.renderMarkdown(child) }} />;
        }
        else {
          return child;
        }
      });
    }
  }

  renderMarkdown(source) {

    if (!this.md) {
      this.md = new Markdown(this.props.options);
    }

    let sourcetomodify = source;

    let regexpattern = "<a href\=(\"|\')((https?:\/\/" + encodeURIComponent() + '|\.\.|\.|\/).+\/?)(\"|\')>([^"]+)<\/a>';

    let sourcemodified = sourcetomodify.replace(new RegExp(regexpattern, "gm"), "<Link to=$2>$5<\/Link>" );

    return this.md.render(source);

  }

});

export default Remarkable;
