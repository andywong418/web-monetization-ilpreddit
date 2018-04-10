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
          <h1 style={{marginTop: '10px'}}> Reddit clone demo </h1>
          <p className="lead text-muted showoff">This is a demo site to show off the capabilities of <a href="https://github.com/interledger/rfcs/blob/master/0028-web-monetization/0028-web-monetization.md">Web Monetization</a> and <a href="https://interledger.org">Interledger</a>.</p>
          <p className="lead text-muted turn"> Turn on your extensions and write comments that can generate revenue through upvotes!</p>
        </Grid.Column>
      </Grid>
      </Container>
      </div>
    );
};

export default Header;
