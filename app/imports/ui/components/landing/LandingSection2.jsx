import React from 'react';
import { Statistic, Grid, Header, Button, Form, Segment } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import LandingPageLineChart from '../defaultcharts/LandingPageLineChart';
import LandingPageBarGraph from '../defaultcharts/LandingPageBarGraph';
import LandingPagePieChart from '../defaultcharts/LandingPagePieChart';
import { calculateCO2, calculateGal, calculateGHG } from '../../../api/trips/ghgcalculation';

/** A simple static component to render some statistics for the landing page. */
class LandingSection2 extends React.Component {
  /** Initialize component state with properties for input */
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      show: false,
    };
  }

  /** Toggle segment that shows the calculation result */
  showResult = () => {
    this.setState({
      show: true,
    });
  }

  /** Handle submission by outputing the values to the console. */
  handleFormSubmit = () => {
    // eslint-disable-next-line no-console
    console.log('input:', this.state.input);
    // eslint-disable-next-line no-console
    console.log('convert liters to US units:', calculateGal(this.state.input));
    // eslint-disable-next-line no-console
    console.log('input CO2:', calculateCO2(calculateGal(this.state.input)));
    // eslint-disable-next-line no-console
    console.log('input GHG:', calculateGHG(calculateGal(this.state.input)));
  }

  /** Update the form controls each time the user interacts with them. */
  handleInputChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  }

  render() {
    /** Some styling components */
    const trackYourGHGemissionsStyling = {
      background: 'linear-gradient(' +
          '-225deg, rgba(8,0,96,1) 0%, rgba(4,62,107,1) 37%, rgba(0,124,118,1) 100%)',
    };
    const fontstyling = {
      fontFamily: 'sans-serif',
      color: 'white',
      fontSize: '20px',
      fontWeight: 'lighter',
    };
    return (
        <div style={{ background: '#001947' }}>

          <Statistic.Group widths='three' style={{ padding: '5em' }}>
            <Statistic inverted>
              <Statistic.Value>1,550</Statistic.Value>
              <Statistic.Label>Users</Statistic.Label>
            </Statistic>
            <Statistic inverted>
              <Statistic.Value>$31,200</Statistic.Value>
              <Statistic.Label>Saved</Statistic.Label>
            </Statistic>
            <Statistic inverted>
              <Statistic.Value>22,000</Statistic.Value>
              <Statistic.Label>Gallons Saved</Statistic.Label>
            </Statistic>
          </Statistic.Group>

          <Grid stackable columns='equal'>
            <Grid.Row style={trackYourGHGemissionsStyling}>
              <div style={{ color: 'white', margin: 'auto' }}>
                <Header className='body' as='h1' style={{ color: 'white' }}> Track your GHG emissions </Header>
                <p className='body'
                   style={fontstyling}>
                  Find out how much GHG emisions you generate and learn of efficient alternatives.
                </p>
                <Button className="ui blue circular button"
                        style={{ fontSize: '16px' }}
                        as={NavLink} exact
                        to="/signup">
                  Start Tracking
                </Button>
              </div>
              <div style={{ paddingRight: '1em' }}>
                <LandingPageLineChart/>
              </div>
            </Grid.Row>

            <Grid.Row style={trackYourGHGemissionsStyling}>
              <Grid.Column width={7} style={{ paddingLeft: '3em' }}>
                <div id="ghgCalc" style={{ color: 'white' }}>
                  <Header className='body' inverted size={'huge'}>Calculate your GHG Beforehand!</Header>
                  <p className='body'
                     style={fontstyling}>
                    Calculate before or after to see how much you can reduce your GHG.
                  </p>
                </div>
              </Grid.Column>
              <Grid.Column width={3}>
                <div>
                  <Form size='small' onSubmit={this.handleFormSubmit}>
                    <Form.Input
                        id='calculator-imperial'
                        placeholder='Enter the gallons of gas'
                        value={this.state.input}
                        onChange={this.handleInputChange}
                    />
                    <Button color='blue' onClick={this.showResult} id='submit-imperial'>Calculate</Button>
                  </Form>
                </div>
              </Grid.Column>
              <Grid.Column width={3}>
                {this.state.show &&
                (<Segment>
                      <p> {calculateCO2(this.state.input)} tons of CO2 emissions is generated
                        from {this.state.input} gallon(s) of
                        gas </p>
                      <p> This is equivalent to the GHG emissions from {calculateGHG(this.state.input)} passenger
                        vehicles
                        driven for one
                        year.</p>
                    </Segment>
                )}
              </Grid.Column>
            </Grid.Row>

          </Grid>

          <Grid stackable columns='equal' style={{ paddingBottom: '3%', paddingTop: '3%' }}>
            <div style={{ margin: 'auto', paddingLeft: '3%' }}>
              <Header
                  className='body'
                  as='h1'
                  style={{ color: 'white' }}>
                Community Data
              </Header>
              <p style={fontstyling}>
                View the environmental impact of the community.
              </p>
            </div>
            <Grid.Column>
              <LandingPageBarGraph/>
            </Grid.Column>
            <Grid.Column>
              <div style={{ paddingRight: '2em' }}>
                <LandingPagePieChart/>
              </div>
            </Grid.Column>
          </Grid>

        </div>
    );
  }
}

export default LandingSection2;
