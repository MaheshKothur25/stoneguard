import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (value, haystack) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  // eslint-disable-next-line
  return inputLength === 0 ? [] : haystack.filter(record => record.make_and_model.toLowerCase().slice(0, inputLength) === inputValue);
};

const getSuggestionValue = suggestion => suggestion.make_and_model;

class SearchBar extends React.Component {
  constructor() {
    super();
    this.resetState = this.resetState.bind(this);
    this.state = {
      searchText: '',
      suggestions: [],
    };
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  resetState = () => {
    this.setState({
      searchText: '',
      suggestions: [],
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    const { haystack } = this.props;
    this.setState({
      suggestions: getSuggestions(value, haystack),
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  renderSuggestion = (suggestion) => {
    const result = [];
    result.push(suggestion);
    return (
      <a className="suggestion-link" href={null} onClick={() => this.handleAutocompleteClick(result)}>
        {suggestion.make_and_model}
      </a>
    );
  };

  handleAutocompleteClick = (result) => {
    const { searchSubmit, history } = this.props;
    searchSubmit(result);
    console.log('result', result);
    history.push(`/product/${result[0].id}`);
  };

  handleAdvancedClick = (e) => {
    e.preventDefault();
    const { history } = this.props;
    history.push('/advanced-search');
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      haystack,
      searchSubmit,
      sendToEquipmentPage,
      history,
    } = this.props;
    const { searchText } = this.state;
    const needle = searchText.toLowerCase();

    const result = haystack.filter((record) => {
      if (
        (record.make_and_model.toLowerCase().includes(needle))
        || (record.asset_number.includes(needle))
        || (record.manufacturer.toLowerCase().includes(needle))
        || (record.tags.toLowerCase().includes(needle))
      ) {
        return record;
      }
      return null;
    });
    searchSubmit(result);

    if (sendToEquipmentPage) {
      history.push('/equipment');
    }
  };

  render() {
    const { buttonClass, autocompleteDisabled } = this.props;
    const { searchText, suggestions } = this.state;
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Make, model, keyword or part number',
      value: searchText,
      onChange: this.handleChange,
      id: 'search-input',
      name: 'searchText',
      className: 'input is-medium',
    };
    return (
      <div className="search-container search-page-container">
        <form onSubmit={this.handleSubmit}>
          <button
            type="button"
            id="search-advanced-button-mobile"
            className="button is-medium is-hidden-tablet"
            onClick={this.handleAdvancedClick}
          >
            Advanced
          </button>
          <div
            className="search-fields-container field has-addons is-horizontal"
          >
            <div className="control is-fullwidth is-expanded">
              {
                autocompleteDisabled
                  ? (
                    <div className="field">
                      <p className="control has-icons-right">
                        <input
                          id="search-input"
                          className="input is-medium"
                          type="text"
                          name="searchText"
                          placeholder="Make, model, keyword or part number"
                          onChange={this.handleChange}
                          value={searchText}
                        />
                      </p>
                    </div>
                  ) : (
                    <div className="field">
                      <p className="control has-icons-right">
                        <Autosuggest
                          suggestions={suggestions}
                          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                          getSuggestionValue={getSuggestionValue}
                          renderSuggestion={this.renderSuggestion}
                          inputProps={inputProps}
                        />
                        {
                          searchText.length > 0
                          && (
                            <a id="clear-search" className="button is-white" href={null} onClick={this.resetState}>
                              <span className="icon is-small is-right has-text-grey-dark">
                                <i className="far fa-times-circle" />
                              </span>
                            </a>
                          )
                        }
                      </p>
                    </div>
                  )
              }
            </div>
            <div className="control">
              <button
                type="button"
                id="search-advanced-button"
                className="button is-medium is-hidden-mobile"
                onClick={this.handleAdvancedClick}
              >
                Advanced
              </button>
            </div>
            <div className="control">
              <button
                type="submit"
                id="search-submit-button"
                className={`button ${buttonClass} is-medium ${buttonClass === 'is-success' ? 'bold' : ''}`}
                onClick={this.handleSubmit}
              >
                <span className="is-hidden-mobile">Search</span>
                <span className="is-hidden-tablet">
                  <span className="icon">
                    <i className="fas fa-search" />
                  </span>
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

SearchBar.propTypes = {
  searchSubmit: PropTypes.func,
  buttonClass: PropTypes.string,
  haystack: PropTypes.arrayOf(PropTypes.shape),
  sendToEquipmentPage: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  autocompleteDisabled: PropTypes.bool,
};

SearchBar.defaultProps = {
  buttonClass: 'is-primary',
  searchSubmit: () => {},
  haystack: [],
  sendToEquipmentPage: false,
  autocompleteDisabled: false,
};

export default withRouter(SearchBar);
