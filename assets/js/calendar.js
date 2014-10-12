/**
 * @jsx React.DOM
 */

var _ = require('lodash');
var React = require('react/addons');
var moment = require('moment');

var MAJOR = [10,12,13,14,15,16,17,18,19,31];
var MINOR = [20,22,23,28,29,30];
var EVEN_TIGHTER = [11];

var Calendar = React.createClass({

  renderRows: function() {
    var rows = [];
    var today = parseInt(moment().format('D'), 10);
    var first = moment().startOf('month').toDate().getDay();
    var daysInMonth = moment().daysInMonth();

    if (first === 0) {
      first = 6
    } else {
      first -= 1
    }

    _.times(5, function(i) {
      var tmpRow = []
      _.times(7, function(d) {
        var base = (i * 7);
        var day = base + (d + 1) - first;
        var cell;

        if (day < 1 || day > daysInMonth) {
          cell = (<td></td>);
        } else {
          var classList = React.addons.classSet({
            major:  _.contains(MAJOR, day),
            minor:  _.contains(MINOR, day),
            'even-tighter': _.contains(EVEN_TIGHTER, day),
            today: day === today
          });

          cell = (<td className={classList}>{day}</td>);
        }

        tmpRow.push(cell);
      })
      rows.push(
        <tr>{tmpRow}</tr>
      );
    })

    return rows;
  },

  render: function() {

    return (
      <div className="stendig">
        <h2 className="year">2014</h2>
        <h2 className="month">October</h2>
        <table>
          <thead>
            <tr>
              <td>M</td>
              <td>T</td>
              <td>W</td>
              <td>T</td>
              <td>F</td>
              <td>S</td>
              <td>S</td>
            </tr>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = Calendar;
