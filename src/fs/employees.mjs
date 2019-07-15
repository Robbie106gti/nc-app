import * as fs from 'fs';
import { createHtmFile } from './utils/create-file.mjs';
import _ from 'lodash';
import { needsReview } from './utils/error.mjs';

const employees = JSON.parse(
    fs.readFileSync('src/fs/json/employees.json')
  );
employees.forEach(emp => emp.active === undefined ? needsReview(emp.fname, emp.active) : '' );
const emp_filtered = employees.filter(emp => emp.active);
const sorted = emp_filtered.sort((a, b) => compare(a, b));
function compare( a, b ) {
    if ( (a.lname + a.fname) < (b.lname + b.fname) ) {
      return -1;
    }
    if ( (a.lname + a.fname) > (b.lname + b.fname) ) {
      return 1;
    }
    return 0;
  }

let html = '';
let i = 0;
for (i = 0; i < sorted.length; i++) {
    const e = sorted[i];
    const split = 5;
    const math = i / split;
    const test = Number.isInteger(math);
    console.log(i , e.fname, test);
    const after = `
        <div class="onecol last"></div>
    </div>`;
    const before = `
        <div class="half-spacer"></div>
    <div class="row">
        <div class="onecol"></div>`;
    if (test === true && i !== 0) {
        html += after + before;
    }
    if (i === 0) {
        html += before;
    }
    html = html.concat(
        `
        <div class="twocol">
            <div class="team-pic">
                <img src="${e.image}" alt="${e.fname}" />
                <h2>${e.fname} ${e.lname}</h2>
                <p>${e.position}</p>
            </div>
        </div>`
        );
}


html = `<!DOCTYPE html>
<html lang="en" class="bigbrother">

<head>
    <!--keep browsers current-->
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible" />
    <!--css-->
    <link rel="stylesheet" href="http://www.nickelscabinets.com/elements/flex/css/flexslider.css" type="text/css" />
    <link rel="stylesheet" href="http://www.nickelscabinets.com/css/base.css" type="text/css" media="all" />
    <link rel="stylesheet" href="http://www.nickelscabinets.com/elements/mmenu/css/jquery.navobile.css" type="text/css"
        media="all" />
    <!--meta-->
    <meta charset="utf-8" />
    <meta name="robots" content="index,follow">
    <meta name="author" content="Nickels Cabinets" />
    <meta name="copyright" content="Nickels Cabinets">
    <meta name="description" content="Nickels Cabinets is a manufacturer of fine custom cabinets for kitchens, baths, and closets.  We have exclusive dealers in western Canada and the United States." />
    <meta name="viewport" content="width=device-width; initial-scale=1">
    <title>The Nickels Support Team | Custom Cabinetry | Nickels Cabinets</title>
    <!--js-->
    <script type="text/javascript" src="http://www.nickelscabinets.com/js/jquery.min.js"></script>
    <script type="text/javascript" src="http://www.nickelscabinets.com/js/modernizer.min.js"></script>
    <script type="text/javascript" src="http://www.nickelscabinets.com/elements/flex/js/jquery.flexslider.js"></script>
    <script type="text/javascript" src="http://www.nickelscabinets.com/elements/mmenu/js/jquery.navobile.min.js"></script>
    <script type="text/javascript" charset="utf-8">
        $(function () {
            $("#navigation").navobile({
                cta: "#show-navobile",
                changeDOM: true
            });
        });
    </script>
</head>

<body>
    <!-- Google Tag Manager -->
    <noscript>
        <iframe src="//www.googletagmanager.com/ns.html?id=GTM-WCZ3KM" height="0" width="0" style="display:none;visibility:hidden"></iframe>
    </noscript>
    <script>
        (function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src =
                '//www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-WCZ3KM');
    </script>
    <!-- End Google Tag Manager -->
    <div id="top"></div>
    <div class="header-pic">
        <img src="images/headers/team.jpg" alt="stacked wood" />
    </div>
    <div class="nav-block-sticky"></div>
    <div id="content" class="navobile-content">
        <div id="logo-sticky">
            <a href="index.html">
                <img src="http://www.nickelscabinets.com/images/nickels_logo_new.png" alt="Nickels Cabinets Logo" title="Nickels Cabinets" />
            </a>
        </div>
        <div class="mobile-header-bar mobile-only">
            <a href="#" id="show-navobile" class="icon">=</a>
        </div>
        <div id="socialicons-sticky">
            <ul>
                <li>
                    <a class="pinterest" href="http://pinterest.com/nickelscabinets" title="Visit our Pinterest page"
                        alt="pinterest"></a>
                </li>
                <li>
                    <a class="googleplus" href="https://plus.google.com/+Nickelscabinets" title="Visit our Google+ page"
                        alt="google+"></a>
                </li>
                <li>
                    <a class="instagram" href="https://www.instagram.com/nickelscabinets/" title="Visit our Instagram page"
                        alt="instagram"></a>
                </li>
                <li>
                    <a class="facebook" href="http://facebook.com/nickelscabinets" title="Visit our Facebook page" alt="facebook"></a>
                </li>
                <li>
                    <a class="twitter" href="http://twitter.com/nickelscabinets" title="Visit our Twitter page" alt="twitter"></a>
                </li>
            </ul>
        </div>
        <!--end #socialicons-home-->
        <div id="navbar-sticky">
            <div class="container">
                <div class="row">
                    <div class="twocol"></div>
                    <div class="eightcol">
                        <nav id="navigation">
                            <ul>
                                <li>
                                    <a href="cabinets.html">workmanship</a>
                                </li>
                                <li>
                                    <a href="http://www.nickelscabinets.com/blog">new at nickels</a>
                                </li>
                                <li>
                                    <a href="http://www.nickelscabinets.com/photographs">image gallery</a>
                                </li>
                                <!-- <li>
                                    <a href="doorstyler.html">doorstyler</a>
</li> -->
                                <!-- <li><a href="http://nickelscabinets.com/enquiries">find a dealer</a></li> -->
                                <li>
                                    <a class="current" href="nickelscabinets.html">about us</a>
                                </li>

                            </ul>
                        </nav>
                    </div>
                    <!--end .eightcol-->
                    <div class="twocol last"></div>
                </div>
                <!--end .row-->
            </div>
            <!--end .container-->
        </div>
        <!--end #navbar-home-->

        <div id="work">
            <div class="container">

                <!--title-->
                <div class="row">
                    <div class="twelvecol last">
                        <div id="title-area">
                            <h1>nickels cabinets</h1>
                        </div>
                    </div>
                </div>
                <div class="half-spacer"></div>
                <div class="row">
                    <div class="fourcol"></div>
                    <div class="fourcol">
                        <p>In 1979, Dieter Nickel convinced his dad, Peter, to join him in building a cabinet company
                            that would
                            have its beginnings in a garage in Richmond, British Columbia. Right from the start, the
                            value
                            of hard and honest work and the strength of the Nickel name was drilled into the core of
                            our
                            brand. Our mission is to provide value through our assurance of consistent quality and
                            service.</p>
                        <div class="qtr-spacer"></div>
                        <p>Time and technology have brought many changes to Nickels Cabinets, but one thing has
                            remained true</p>
                        <div class="qtr-spacer"></div>
                        <p style="padding-left:40px; padding-right:40px; font-style:italic;">--discerning clients rely
                            on us to care about the details required for exceptional cabinetwork. </p>
                        <div class="qtr-spacer"></div>
                        <p>At Nickels our staff are steadfastly committed to this goal.</p>
                        <div class="qtr-spacer"></div>
                        <div class="qtr-spacer"></div>


                    </div>

                    <div class="fourcol last"></div>

                </div>
                <div class="row">
                    <div class="twelvecol last">
                        <div id="title-area" style="padding-top:0;">
                            <h1>nickels support team</h1>
                        </div>
                    </div>
                </div>
            </div>` + html + `<div class="row">
            <div class="twelvecol last">
                <div id="title-area" class="contact">
                    <h1>contact us</h1>
                </div>
            </div>
        </div>
        <div class="half-spacer"></div>
        <div class="row">
            <div class="twocol"></div>
            <div class="twocol">

                <h3>our head office:</h3>
                <br />
                <p>6760 Graybar Road</p>
                <p>Richmond, BC</p>
                <p>V6W 1J1</p>
                <div class="qtr-spacer"></div>
            </div>
            <div class="twocol">

                <h3>phone:</h3>
                <br />
                <p>local: 604.270.8080</p>
                <p>toll free: 1.877.270.8081</p>
                <p>fax: 604.270.3618</p>
                <div class="qtr-spacer"></div>
            </div>
            <div class="twocol">

                <h3>office hours:</h3>
                <br />
                <p> Monday to Friday</p>
                <p> 8:00 am to 4:30 pm (PST)</p>
                <div class="qtr-spacer"></div>
            </div>
            <div class="twocol">

                <h3>other ways to connect with us:</h3>
                <br />
                <div class="contact-social">
                    <p>email:&nbsp;&nbsp;
                        <a href="mailto:info@nickelscabinets.com">nickels information</a>
                    </p>
                    <p>like us on:&nbsp;&nbsp;
                        <a href="http://facebook.com/nickelscabinets" title="Visit our Facebook page" alt="facebook">facebook</a>
                    </p>
                    <p>join our cicle on:&nbsp;&nbsp;
                        <a href="https://plus.google.com/b/117592498014579966625/117592498014579966625/posts" title="Visit our Google+ page"
                            alt="google+">google+</a>
                    </p>
                    <p>follow us on:&nbsp;&nbsp;
                        <a href="http://pinterest.com/nickelscabinets" title="Visit our Pinterest page" alt="pinterest">pinterest</a>
                    </p>
                    <p>follow us on:&nbsp;&nbsp;
                        <a href="http://twitter.com/nickelscabinets" title="Visit our Twitter page" alt="twitter">twitter</a>
                    </p>
                </div>
                <div class="qtr-spacer"></div>
            </div>
            <div class="twocol">

                <div class="twocol last"></div>
            </div>
        </div>
        <div id="mainfooter">
            <div class="container">
                <div class="row grey">
                    <div class="onecol"></div>
                    <div class="onecol">
                        <div class="qtr-spacer"></div>
                        <h3>products</h3>
                        <div class="eighth-spacer"></div>
                        <ul>
                            <li>
                                <a href="/docs/BROCHURE%202017.PDF" target="_new">Brochure 2017</a>
                            </li>
                        </ul>
                    </div>
                    <div class="onecol">
                        <div class="qtr-spacer"></div>
                        <h3>documents</h3>
                        <div class="eighth-spacer"></div>
                        <ul>

                            <li>
                                <a target="_new" href="/docs/stewardship.pdf">stewardship</a>
                            </li>
                            <li>
                                <a target="_new" href="/docs/warranty.pdf">lifetime warranty</a>
                            </li>
                            <li>
                                <a target="_new" href="/docs/cabinet-care.pdf">cabinet care</a>
                            </li>
                            <li>
                                <a target="_new" href="/docs/ckca-nickels.pdf">CKCA certificate</a>
                            </li>
                        </ul>
                    </div>
                    <div class="onecol">
                        <div class="qtr-spacer"></div>
                        <h3>contact</h3>
                        <div class="eighth-spacer"></div>
                        <ul>
                            <li>
                                <a href="mailto:info@nickelscabinets.com">email us</a>
                            </li>
                            <!-- <li><a href="/enquiries">find a dealer</a></li> -->
                            <li>
                                <a href="/enquiries/?p=37">become a dealer</a>
                            </li>
                        </ul>
                    </div>
                    <div class="onecol">
                        <div class="qtr-spacer"></div>
                        <h3>resources</h3>
                        <div class="eighth-spacer"></div>
                        <ul>
                            <li>
                                <a href="suppliers.html">industry links</a>
                            </li>

                            <!-- <li>
                                <a href="doorstyler.html">doorstyler</a>
</li> -->
                            <li>
                                <a href="http://nickelscabinets.com/enquiries/?page_id=55">employment</a>
                            </li>
                        </ul>
                    </div>
                    <div class="onecol">
                        <div class="qtr-spacer"></div>
                        <h3>legal</h3>
                        <div class="eighth-spacer"></div>
                        <ul>
                            <li>
                                <a href="privacy.html">privacy</a>
                            </li>
                            <li>
                                <a href="terms.html">terms of use</a>
                            </li>
                        </ul>
                    </div>
                    <div class="twocol"></div>
                    <div class="threecol">
                        <div class="qtr-spacer"></div>
                        <h3>connect with us</h3>
                        <div class="eighth-spacer"></div>
                        <div id="social-columns">
                            <div class="bucket-links" id="first-column">
                                <a href="http://www.nickelscabinets.com/blog" target="_self">
                                    <img src="images/homepage/rss.png" title="See what's new on our blog" alt="Blog" />
                                </a>
                            </div>
                            <div id="second-column" class="bucket-links">
                                <a href="http://twitter.com/nickelscabinets" target="_new">
                                    <img src="images/homepage/twitter.png" title="Take a look at our twitter feed" alt="Twitter" />
                                </a>
                            </div>
                            <div id="third-column" class="bucket-links">
                                <a href="http://facebook.com/nickelscabinets" target="_new">
                                    <img src="images/homepage/facebook.png" title="Like us on Facebook" alt="Facebook" />
                                </a>
                            </div>
                            <div id="fourth-column" class="bucket-links">
                                <a href="https://plus.google.com/+Nickelscabinets" target="_new">
                                    <img src="images/homepage/googleplus.png" title="Visit our Google+ feed" alt="Google+" />
                                </a>
                            </div>
                            <div id="fifth-column" class="bucket-links">
                                <a href="http://pinterest.com/nickelscabinets" target="_new">
                                    <img src="images/homepage/pinterest.png" title="See our pins on Pinterest" alt="Pinterest" />
                                </a>
                            </div>
                        </div>
                        <div class="eighth-spacer"></div>
                        <h3>stay up to date</h3>
                        <!-- MailChimp Signup Form -->
                        <div id="mc_embed_signup">
                            <form action="http://nickelscabinets.us1.list-manage.com/subscribe/post?u=3adfb3e3ec1dd1d7066e7f82d&amp;id=ed0e84688f"
                                method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate"
                                target="_self" novalidate>
                                <label for="mce-EMAIL"></label>
                                <div class="clear">
                                    <input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="We promise we will not email you too often."
                                        required>
                                    <input type="submit" value="subscribe" name="subscribe" id="mc-embedded-subscribe"
                                        class="button">
                                </div>
                            </form>
                        </div>
                        <br>
                        <br>
                        <table style="width: 86px;" cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <a href="http://www.houzz.com/pro/nickelscabinets/nickels-custom-cabinets">
                                        <img src="http://st.houzz.com/static/badge86_25.png" alt="Remodeling and Home Design"
                                            width="86" height="25" border="0" />
                                    </a>
                                </td>
                                <td>
                                    <a href="http://www.ckca.ca/">
                                        <img width="86" style="width: 86px; padding-left: 10px;" src="http://www.ckca.ca/wp-content/themes/ckc-theme/images/footer-logo-ckca.png"
                                            alt="CKCA" />
                                    </a>
                                </td>
                            </tr>
                        </table>
                        <!--End MailChimp Signup-->
                    </div>
                    <div class="onecol last"></div>

                </div>
                <div class="row grey">
                    <div class="onecol"></div>
                    <div class="fourcol">
                        <div id="logo-footer">
                            <a href="index.php">
                                <img src="images/nickels_logo_new.png" alt="Nickels Cabinets Logo" title="Nickels Cabinets" />
                            </a>
                        </div>
                        <p class="copyright">&copy;
                            <script language="JavaScript" type="text/javascript">
                                var today = new Date()
                                var year = today.getFullYear()
                                document.write(year)
                            </script>
                            Nickels Cabinets</p>
                    </div>
                    <div class="sevencol last"></div>
                </div>
                <div class="qtr-spacer grey"></div>
            </div>
        </div>
        <!-- end .container-->
    </div>
    <!-- end #content .navobile-content-->
    <script type="text/javascript" charset="utf-8">
        $(document).ready(function () {
            $('.flexslider').flexslider();
        });
    </script>
    <script type="text/javascript" charset="utf-8">
        $(window).on('scroll', function () {
            console.log($(this).scrollTop());
            if ($(this).scrollTop() > 10 && !$('.nav-block-sticky').hasClass('visible')) {
                $('.nav-block-sticky').animate({
                    opacity: 1
                }, 0, function () {
                    $(this).addClass('visible').removeAttr('style');
                });
            } else if ($(this).scrollTop() <= 9 && $('.nav-block-sticky').hasClass('visible')) {
                $('.nav-block-sticky').animate({
                    opacity: .55
                }, 0, function () {
                    $(this).removeClass('visible').removeAttr('style');
                });
            }
        });
    </script>
</body>

</html>`;
createHtmFile(html, 'nickelscabinets');
// node --experimental-modules src/fs/employees.mjs