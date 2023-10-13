import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { AppRegistry } from 'react-native';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const { renderPage } = ctx;
    AppRegistry.registerComponent('ReactNative', () => Main);
    // getApplication registered by react native web
    // https://github.com/necolas/react-native-web/blob/master/packages/react-native-web/src/exports/AppRegistry/renderApplication.js#L57
    // @ts-ignore
    const { getStyleElement } = AppRegistry.getApplication('ReactNative');
    const page = await renderPage();
    const styles = getStyleElement();
    return { ...page, styles };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}