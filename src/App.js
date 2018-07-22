import * as React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router'
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';

import Routes from './components/Routes';
import getTranslations from './translations';
import Loading from './components/Loading';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          location: undefined,
          locale: 'fr',
          translations: null,
      };
  }

  componentDidMount() {
    addLocaleData([...en, ...fr]);
    let locale = navigator.language.substring(0, 2);

    getTranslations().then((translations) => {
        if (!translations[locale]) {
            locale = 'fr';
        }

        this.setState({
          locale,
          translations,
        })
    });
  }

  componentDidUpdate(prevState) {
      if (this.state.location && !this.state.location.query.sort) {
          window.scrollTo(0, 0);
      }
  }

  render() {
    const { store, persistor, history } = this.props;
    const { locale, translations } = this.state;

    if (!translations) {
      return null;
    }

    return (
        <Provider store={store}>
            <IntlProvider
                locale={locale}
                messages={translations[locale]}
            >
                <PersistGate loading={<Loading />} persistor={persistor} >
                    <ConnectedRouter history={history}>
                        <Routes store={store} />
                    </ConnectedRouter>
                </PersistGate>
            </IntlProvider>
        </Provider>
    );
  }
}

export default App;
