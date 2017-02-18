import React from 'react'
import Link from 'next/prefetch'
import SVGIMG from '../components/SVGIMG.js'
import logo from '../static/logo.svg';
import clientlogos from '../static/logos-clients.svg';
import bg from '../static/header-background-gray.svg';
import Markdown from '../components/MarkdownText.js';
import Container from '../components/Container.js';

// If you are using `css-loader` with CSS modules,
// `styles` would be an object containing the generated classnames

class MyComponent extends React.Component {
  static async getInitialProps({req}) {

    return req
      ? {
        userAgent: req.headers['user-agent']
      }
      : {
        userAgent: navigator.userAgent
      }
  }

  render() {
    return (
      <main>
        <header id="header">

          <SVGIMG src={bg} />

          <div id="logo">

            <SVGIMG src={logo} />
            <div id="description">
            <Markdown source='This is one sentence.' options={{
              html: true,
              linkify: true,
              typographer: true
            }}/>
            </div>
          </div>

        </header>

        <Container id="intro">
          <Markdown options={{
            html: true,
            linkify: true,
            typographer: true
          }}>
            This is a short paragraph.

            This is also a short paragraph.
          </Markdown>
        </Container>

      </main>
    );
  }
}

export default MyComponent;
