import React from 'react';
import "../scss/styles.scss";

const Test = () => {
    const mql = window.matchMedia('(max-width: 700px)');

    let mobileView = mql.matches;
    if (mobileView) {
        return (


            <div className="fmenu">
                <button className="flabel">Follow Me</button>
                <div className="fspacer"></div>

                <div className="fitem"><img src={require('../images/SVG/instagram.svg')} alt="" /></div>
                <div className="fitem"><img src={require('../images/SVG/facebook2.svg')} alt="" /></div>
                <div className="fitem"><img src={require('../images/SVG/twitter.svg')} alt="" /></div>

            </div>
        )
    } else {
        return (
            <div className="fmenu">
                <div className="flabel">Follow Me</div>
                <div className="fspacer"></div>

                <div className="fitem"><span>Instagram</span></div>
                <div className="fitem"><span>Twitter</span></div>
                <div className="fitem"><span>Facebook</span></div>

            </div>
        )
    }


}

const Footer = () => {
    return (
        <div className="com">
            <div className="fconte">

                <div className="follow">
                    <Test />


                </div>


                <div className="fpayment">
                    <img src={require('../images/upi.png')} alt="" />
                    <img src={require('../images/card.png')} alt="" />
                    <img src={require('../images/wallet.png')} alt="" />
                    <img src={require('../images/netBanking.png')} alt="" />



                </div>

            </div>
        </div>
    )
}
export default Footer;