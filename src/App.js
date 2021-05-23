import React from 'react';
import './style.css';

export default function App() {
  let field = [];

  function createBorders(field) {
    field.map(line => {
      line.unshift('|');
      line.push('|');
    });

    let borders = [];
    borders.length = field[field.length % 2].length;
    borders.fill('-');
    field.unshift(borders);
    field.push(borders);

    return field;
  }

  function createCanvas(x, y) {
    for (let i = 0; i < y; i++) {
      let row = [];
      for (let j = 0; j < x; j++) {
        row.push(' ');
      }
      field.push(row);
    }

    return createBorders(field);
  }

  function createLine(x1, y1, x2, y2) {
    field.forEach((y, yIndex) => {
      if (yIndex >= y1 && yIndex <= y2) {
        y.forEach((x, xIndex) => {
          if (xIndex >= x1 && xIndex <= x2) {
            field[yIndex][xIndex] = 'x';
          }
        });
      }
    });
    return field;
  }

  function createRectangle(x1, y1, x2, y2) {
    createLine(x1, y1, x2, y1);
    createLine(x1, y2, x2, y2);
    createLine(x2, y1, x2, y2);
    createLine(x1, y1, x1, y2);
    return field;
  }

  function fill(data, y, x, colour) {
    let target = data[x][y];

    function flow(x, y) {
      if (x >= 0 && x < data.length && y >= 0 && y < data[x].length) {
        if (data[x][y] === target) {
          data[x][y] = colour;
          flow(
            x - 1,
            y
          ); // check up
          flow(
            x + 1,
            y
          ); // check down
          flow(
            x,
            y - 1
          ); // check left
          flow(
            x,
            y + 1
          ); // check right
        }
      }
    }

    flow(
      x,
      y
    );
    return field;
  }

  return (
    <div className="App">
      Canvas: C 230 100
      {createCanvas(230, 100).map(line => (
        <pre key={Math.random()}>{line.join(' ')}</pre>
      ))}
      Rectangle: R 160 10 200 30
      {createRectangle(160, 10, 200, 30).map(line => (
        <pre key={Math.random()}>{line.join(' ')}</pre>
      ))}
      Line: L 10 20 60 20
      {createLine(10, 20, 60, 20).map(line => (
        <pre key={Math.random()}>{line.join(' ')}</pre>
      ))}
      Line: L 60 30 60 40
      {createLine(60, 30, 60, 40).map(line => (
        <pre key={Math.random()}>{line.join(' ')}</pre>
      ))}
      Bucket Fill: B 100 30 o
      {fill(field, 100, 30, 'o').map(line => (
        <pre key={Math.random()}>{line.join(' ')}</pre>
      ))}
    </div>
  );
}
