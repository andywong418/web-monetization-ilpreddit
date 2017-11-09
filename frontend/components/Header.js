import React from 'react';
import {Grid, Image, Container} from 'semantic-ui-react';
const Header = () => {
    return (
      <div className="header-container">
      <Container>
      <Grid>
        <Grid.Column>
          <Image src="http://i.imgur.com/SEr26ry.png" height="50px" />
        </Grid.Column>
        <Grid.Column width={8}>
          <h1 style={{marginTop: '10px'}}> Reddit - the homepage of the Internet</h1>
        </Grid.Column>
      </Grid>
      </Container>
      </div>
    );
};

export default Header;
