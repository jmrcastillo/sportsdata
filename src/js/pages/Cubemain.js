/**
 * Created by me on 1/31/17.
 */
import React from "react";
//import Carousel from "../lib/carousel";
//import Carousel from "../lib/carousel";


export default class Cubemain extends React.Component {
  /*	handleChange(e) {
      const title = e.target.value;
      this.props.changeTitle(title);
    }*/

  render() {
    return (

      <main className="main">
        <div className="container"><span className="item active"></span>

          {/*		React Component Carousel
						Documentation at
				        https://github.com/FormidableLabs/nuka-carousel
				 */}
{/*          <Carousel autoplay={true} wrapAround={false} showNextPrev={false} width="100%">
            <img src="/images/carousel04.jpg"/>
            <img src="/images/carousel02.jpg"/>
            <img src="/images/carousel03.jpg"/>
            <img src="/images/carousel01.jpg"/>
            <img src="/images/carousel05.jpg"/>
          </Carousel>*/}



          <table width="100%" border="0">
            <tbody>
            <tr>
                <td colSpan="3"><div align="center"><img src="/images/carousel02.jpg" width="100%" /></div></td>
            </tr>
            <tr>
              <td><div align="center"><a href="/picks-mobile"><img src="/images/nav_tiles/tile01.png" width="100%"/></a></div></td>
                <td><div align="center"><a href="/scores-lines"><img src="/images/nav_tiles/tile03.png" width="100%"/></a></div></td>
                <td><div align="center"><a href="/login-register"><img src="/images/nav_tiles/tile10.png" width="100%"/></a></div></td>


            </tr>
            <tr>
              <td><div align="center"><a href="/cappers-report-card"><img src="/images/nav_tiles/tile11.png" width="100%"/></a></div></td>
                <td><div align="center"><a href="/publications"><img src="/images/nav_tiles/tile02.png" width="100%"/></a></div></td>
                {/*<td><div align="center"><a href="/trends-matchups"><img src="/images/nav_tiles/tile06.png" width="100%"/></a></div></td>*/}

              <td><div align="center"><a href="http://cube.statfox.com"><img src="/images/nav_tiles/tile06.png" width="100%"/></a></div></td>


            </tr>
            <tr>
              <td><div align="center"><a href="/steam-alerts"><img src="/images/nav_tiles/tile07.png" width="100%"/></a></div></td>
              <td><div align="center"><a href="/videos-podcasts"><img src="/images/nav_tiles/tile08.png" width="100%"/></a></div></td>
              <td><div align="center"><a href="/betting-tools"><img src="/images/nav_tiles/tile09.png" width="100%"/></a></div></td>
            </tr>
            </tbody>
          </table>
        </div>
      </main>

    );
  }
}