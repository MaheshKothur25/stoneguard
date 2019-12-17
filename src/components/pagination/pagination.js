import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from, to, step = 1) => {
  let i = from;
  const rangeArr = [];

  while (i <= to) {
    rangeArr.push(i);
    i += step;
  }

  return rangeArr;
};

class Pagination extends Component {
  constructor(props) {
    super(props);
    const { totalRecords = null, pageLimit = 30, pageNeighbors = 0 } = props;

    this.pageLimit = typeof pageLimit === 'number' ? pageLimit : 30;
    this.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;

    // pageNeighbors can be: 0, 1 or 2
    this.pageNeighbors = typeof pageNeighbors === 'number'
      ? Math.max(0, Math.min(pageNeighbors, 2))
      : 0;

    // this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);

    this.state = {
      currentPage: 1,
    };
  }

  componentDidMount() {
    this.gotoPage(1);
  }

  gotoPage = (page) => {
    const { onPageChanged = f => f, totalPages } = this.props;
    // eslint-disable-next-line
    // const totalPages = this.totalPages;
    // eslint-disable-next-line
    const pageLimit = this.pageLimit;

    const currentPage = Math.max(0, Math.min(page, totalPages));

    const paginationData = {
      currentPage,
      totalPages,
      pageLimit,
      totalRecords: this.totalRecords,
    };

    this.setState({ currentPage }, () => onPageChanged(paginationData));
  };

  handleClick = page => (evt) => {
    evt.preventDefault();
    this.gotoPage(page);
  };

  handleMoveLeft = (evt) => {
    evt.preventDefault();
    const { currentPage } = this.state;
    this.gotoPage(currentPage - (this.pageNeighbors * 2) - 1);
  };

  handleMoveRight = (evt) => {
    evt.preventDefault();
    const { currentPage } = this.state;
    this.gotoPage(currentPage + (this.pageNeighbors * 2) + 1);
  };
  /**
   * Let's say we have 10 pages and we set pageNeighbors to 2
   * Given that the current page is 6
   * The pagination control will look like the following:
   *
   * (1) < {4 5} [6] {7 8} > (10)
   *
   * (x) => terminal pages: first and last page(always visible)
   * [x] => represents current page
   * {...x} => represents page neighbours
   */

  fetchPageNumbers = () => {
    const { currentPage } = this.state;
    // eslint-disable-next-line
    const totalPages = this.props.totalPages;
    // eslint-disable-next-line
    const pageNeighbors = this.pageNeighbors;

    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = (this.pageNeighbors * 2) + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbors);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbors);

      let pages = range(startPage, endPage);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = (totalPages - endPage) > 1;
      const spillOffset = totalNumbers - (pages.length + 1);
      let extraPages;

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case (hasLeftSpill && !hasRightSpill): {
          extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case (!hasLeftSpill && hasRightSpill): {
          extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  render() {
    const { currentPage } = this.state;
    // eslint-disable-next-line
    if (!this.totalRecords || this.props.totalPages === 1) return null;

    const pages = this.fetchPageNumbers();

    return (
      <Fragment>
        <div className="pagination" role="navigation" aria-label="pagination">
          {
            pages.map((page) => {
              if (page === LEFT_PAGE) {
                return (
                  <button
                    type="button"
                    key={page}
                    className="pagination-previous"
                    aria-label="Previous"
                    onClick={this.handleMoveLeft}
                  >
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">&nbsp;Previous</span>
                  </button>
                );
              }

              if (page === RIGHT_PAGE) {
                return (
                  <button
                    type="button"
                    key={page}
                    className="pagination-next"
                    aria-label="Next"
                    onClick={this.handleMoveRight}
                  >
                    <span className="sr-only">Next&nbsp;</span>
                    <span aria-hidden="true">&raquo;</span>
                  </button>
                );
              }
              return null;
            })
          }
          <ul className="pagination-list">
            {
              pages.map((page) => {
                if (page !== RIGHT_PAGE && page !== LEFT_PAGE) {
                  return (
                    <li key={Math.random().toString(36).substring(2)}>
                      <button
                        type="button"
                        className={`pagination-link ${currentPage === page ? ' is-current' : ''}`}
                        onClick={this.handleClick(page)}
                      >
                        {page}
                      </button>
                    </li>
                  );
                }
                return null;
              })
            }
          </ul>
        </div>
      </Fragment>
    );
  }
}

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbors: PropTypes.number,
  onPageChanged: PropTypes.func,
};

Pagination.defaultProps = {
  pageLimit: 5,
  pageNeighbors: 1,
  onPageChanged: () => {},
};

export default Pagination;
