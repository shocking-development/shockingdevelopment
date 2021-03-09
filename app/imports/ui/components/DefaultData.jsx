import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Stuffs } from '../../api/graph-default/Stuff';


/** A simple static component to render some boxes for the landing page. */

class DefaultData extends React.Component {
  dataOne = [49.9, 71.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  render() {

    //const dataOne = [49.9, 71.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const defaultdata = {
      dataOne: [49.9, 71.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      dataTwo: [49.9, 71.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      dataThree: [49.9, 71.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };

    };

}

export default DefaultData;
