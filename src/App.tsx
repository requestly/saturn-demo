import { FC, useEffect, useState } from "react";
import { businessUsers, personalUsers } from "./data";
import { saturnIntegration } from "./integration";
import "./style.css";

// template: https://salahtml.uxper.co/home-chat-service.html

const saturnLandingPageLink = "https://saturnhq.io/";
const formbricksLink = "https://app.formbricks.com/s/clryjrhs4128jdehoslglcqv3";

type UserType = "anonymous" | "business" | "personal";

const getRandomUserIndex = () => {
  return Math.floor(Math.random() * 10);
};

export const App: FC = () => {
  const [userTypeToLoad, setUserTypeToLoad] = useState<UserType>("anonymous");
  const [userIndex, setUserIndex] = useState(0);

  useEffect(() => {
    const { userType = "personal", index = 0 } =
      JSON.parse(localStorage.getItem("saturn_demo_user")) ?? {};

    setUserIndex(index);
    setUserTypeToLoad(userType);
  }, []);

  useEffect(() => {
    let userData;
    switch (userTypeToLoad) {
      case "personal":
        userData = personalUsers[userIndex];
        break;

      case "business":
        userData = businessUsers[userIndex];
        break;

      default:
        userData = null;
        break;
    }

    saturnIntegration.init(userData);
  }, [userIndex, userTypeToLoad]);

  const handleOnChange = (e) => {
    const userType = e?.target?.value as UserType;
    const index = getRandomUserIndex();

    localStorage.setItem(
      "saturn_demo_user",
      JSON.stringify({ userType, index })
    );

    setUserIndex(index);
    setUserTypeToLoad(userType);
  };

  return (
    <>
      <div id="wrapper">
        {/* BEGIN SITE HEADER */}
        <header id="header" className="site-header is-transparent">
          <h1>test</h1>
          <div className="container-fluid">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              className="row flex-align-c inner"
            >
              <div className="col-lg-3 col-6">
                <div className="header-left flex flex-align-c">
                  <div className="canvas-menu">
                    <div className="icon">
                      <a href="#">
                        <svg
                          width="30px"
                          height="14px"
                          viewBox="0 0 30 14"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <g
                            stroke="none"
                            strokeWidth="1"
                            fill="none"
                            fillRule="evenodd"
                          >
                            <g
                              transform="translate(-50.000000, -33.000000)"
                              fill="#111111"
                            >
                              <g
                                id="off-menu"
                                transform="translate(50.000000, 28.000000)"
                              >
                                <g
                                  id="icon-menu"
                                  transform="translate(0.000000, 5.000000)"
                                >
                                  <rect
                                    id="Rectangle-1"
                                    x="0"
                                    y="0"
                                    width="30"
                                    height="3"
                                    rx="1.5"
                                  ></rect>
                                  <rect
                                    id="Rectangle-2"
                                    x="0"
                                    y="11"
                                    width="20"
                                    height="3"
                                    rx="1.5"
                                  ></rect>
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="logo">
                    <a
                      title="Saturn"
                      target="_blank"
                      href={saturnLandingPageLink}
                    >
                      <img
                        width={140}
                        height={50}
                        className="site-main-logo logo-retina"
                        src="https://saturnhq.io/wp-content/uploads/2023/11/Logo-final.png"
                        data-retina="https://saturnhq.io/wp-content/uploads/2023/11/Logo-final.png"
                        alt="Saturn"
                      />
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-6">
                <div className="header-right flex flex-align-c flex-content-e">
                  {/* <div className="customer">
                    <a href="#">
                      <i className="las la-user-circle"></i>
                      <span>Log In</span>
                    </a>
                  </div> */}
                  <div className="buttons">
                    <a
                      href={formbricksLink}
                      target="_blank"
                      className="button fullfield"
                    >
                      <i className="las la-headset"></i>
                      <span>Get Early Access</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* END SITE HEADER  */}

        {/* BEGIN SITE MAIN  */}
        <main id="main" className="site-main">
          <div className="site-content pt0 pb0">
            <section
              className="section background-cover-right opt120 spdb"
              style={{
                paddingTop: "200px",
                paddingBottom: "200px",
                backgroundImage: `url("https://salahtml.uxper.co/assets/images/hcs-02.png")`,
              }}
            >
              <div className="container">
                <div className="row flex-align-c">
                  <div style={{ marginBottom: "3rem" }} className="col-lg-6">
                    <div className="heading mb32">
                      <h2 className="heading-title size-xl">
                        Provide better B2B <br />
                        support with{" "}
                        <span className="color-navy no-underline">Saturn</span>
                      </h2>
                      <div className="heading-desc">This is a demo app.</div>
                    </div>
                    <div className="button-wrap mt32">
                      <a
                        title="Know more"
                        className="button fullfield xs-mb10"
                        target="_blank"
                        href={saturnLandingPageLink}
                      >
                        Know more
                      </a>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    {/* here */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <div className="user-selection-container">
                        <h3 className="header">Select a user type to load:</h3>

                        <div className="radio-input">
                          <input
                            type="radio"
                            id="personal"
                            name="user"
                            value="personal"
                            checked={userTypeToLoad === "personal"}
                            onChange={handleOnChange}
                          />

                          <label htmlFor="personal">
                            Normal user (Personal email)
                          </label>
                        </div>

                        <div className="radio-input">
                          <input
                            type="radio"
                            id="business"
                            name="user"
                            value="business"
                            checked={userTypeToLoad === "business"}
                            onChange={handleOnChange}
                          />

                          <label htmlFor="business">
                            Business user (Business email)
                          </label>
                        </div>

                        <div className="radio-input">
                          <input
                            type="radio"
                            id="anonymous"
                            name="user"
                            value="anonymous"
                            checked={userTypeToLoad === "anonymous"}
                            onChange={handleOnChange}
                          />
                          <label htmlFor="anonymous">Anonymous user</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* <section className="section spdt">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="pdr30">
                      <div className="heading">
                        <h2 className="heading-title size-l">
                          This is a demo app!
                        </h2>
                        <div className="heading-desc">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry.
                        </div>
                      </div>
                      <div className="block-image-box layout-02 background-01 wow animate__fadeInUp">
                        <h3 className="title">
                          Customize & Build professional script
                        </h3>
                        <div className="desc">Lorem Ipsum is simply dummy.</div>
                        <img
                          src="https://salahtml.uxper.co/assets/images/hcs-05.png"
                          alt="Image"
                        />
                      </div>
                      <div className="block-image-box layout-02 background-02 wow animate__fadeInUp">
                        <h3 className="title">Collect customers data</h3>
                        <div className="desc">Lorem Ipsum is simply dummy.</div>
                        <img
                          src="https://salahtml.uxper.co/assets/images/hcs-06.png"
                          alt="Image"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="pdl30 lg-mt32">
                      <div className="block-image-box layout-02 background-03 wow animate__fadeInUp">
                        <h3 className="title">Quick reply suggestion</h3>
                        <div className="desc">Lorem Ipsum is simply dummy.</div>
                        <img
                          src="https://salahtml.uxper.co/assets/images/hcs-07.png"
                          alt="Image"
                        />
                      </div>
                      <div className="block-image-box layout-02 background-04 wow animate__fadeInUp">
                        <h3 className="title">Bug detection and repair</h3>
                        <div className="desc">Lorem Ipsum is simply dummy.</div>
                        <img
                          src="https://salahtml.uxper.co/assets/images/hcs-08.png"
                          alt="Image"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="section spdt">
              <div className="container">
                <div className="heading align-center">
                  <h2 className="heading-title size-l">
                    Unique Selling Points
                  </h2>
                </div>
                <div className="block-image-box layout-03">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="pdr30 wow animate__fadeInUp">
                        <div className="item">
                          <div className="thumb background-01">
                            <img
                              src="https://salahtml.uxper.co/assets/images/hcs-09.png"
                              alt="Image"
                            />
                          </div>
                          <div className="content">
                            <h3 className="title">Video calling support</h3>
                            <div className="desc">
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="pdl30 wow animate__fadeInUp">
                        <div className="item">
                          <div className="thumb background-02">
                            <img
                              src="https://salahtml.uxper.co/assets/images/hcs-10.png"
                              alt="Image"
                            />
                          </div>
                          <div className="content">
                            <h3 className="title">AI data analytics</h3>
                            <div className="desc">
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="section spdtb">
              <div className="container">
                <div className="heading align-center">
                  <h2 className="heading-title size-l">Our Customers</h2>
                </div>
                <div className="block-testimonial layout-06">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="item background-01 wow animate__fadeInUp">
                        <div className="content">
                          “Lörem ipsum preneledes eurosam då teramani. Hönat
                          lesse då teraman.
                        </div>
                        <div className="author">- Jane Smith -</div>
                        <div className="avatar">
                          <img
                            src="https://salahtml.uxper.co/assets/images/hcs-11.png"
                            alt="Customers"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="item background-02 wow animate__fadeInUp">
                        <div className="content">
                          “Lörem ipsum preneledes eurosam då teramani. Hönat
                          lesse då teraman.
                        </div>
                        <div className="author">- Max William -</div>
                        <div className="avatar">
                          <img
                            src="https://salahtml.uxper.co/assets/images/hcs-12.png"
                            alt="Customers"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="item background-03 wow animate__fadeInUp">
                        <div className="content">
                          “Lörem ipsum preneledes eurosam då teramani. Hönat
                          lesse då teraman.
                        </div>
                        <div className="author">- Sane William -</div>
                        <div className="avatar">
                          <img
                            src="https://salahtml.uxper.co/assets/images/hcs-13.png"
                            alt="Customers"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="section-banner layout-09">
              <div className="container">
                <div className="inner">
                  <div className="row flex-align-c">
                    <div className="col-lg-6">
                      <div className="heading mb32">
                        <h2 className="heading-title size-l">
                          Increase your sales Increase your revenue
                        </h2>
                      </div>
                      <div className="button-wrap">
                        <a
                          href="#"
                          className="button fullfield"
                          title="Try it free"
                        >
                          Try it free
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="pdl80 lg-mt32">
                        <div className="block-list layout-06">
                          <ul>
                            <li className="wow animate__fadeInRight">
                              <div className="icon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M23.25 12.75V6H16.5"
                                    stroke="#111"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></path>
                                  <path
                                    d="M23.25 6L15.311 13.939C15.0297 14.2205 14.648 14.3787 14.25 14.3787C13.852 14.3787 13.4703 14.2205 13.189 13.939L10.061 10.811C9.77967 10.5295 9.39799 10.3713 9 10.3713C8.60201 10.3713 8.22033 10.5295 7.939 10.811L0.75 18"
                                    stroke="#111"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></path>
                                </svg>
                              </div>
                              <span>Scale up your business</span>
                            </li>
                            <li className="wow animate__fadeInRight">
                              <div className="icon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M14.7578 21.375H2.24978C2.03144 21.3751 1.82391 21.28 1.68138 21.1146C1.53885 20.9492 1.47546 20.7299 1.50778 20.514L7.37878 6.375H17.8788L15.4998 20.514C15.5321 20.7299 15.4687 20.9492 15.3262 21.1146C15.1836 21.28 14.9761 21.3751 14.7578 21.375V21.375Z"
                                    stroke="#111"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></path>
                                  <path
                                    d="M12.5249 11.1989L10.5559 10.6989C9.93274 10.5382 9.28331 10.8428 9.00848 11.4247C8.73366 12.0066 8.91094 12.7017 9.43088 13.0809L11.2239 14.3929C11.7375 14.7739 11.9106 15.4647 11.6373 16.0429C11.364 16.6211 10.7204 16.9259 10.0999 16.7709L8.12988 16.2709"
                                    stroke="#111"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></path>
                                  <path
                                    d="M11.0718 10.828L11.4448 9.375"
                                    stroke="#111"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></path>
                                  <path
                                    d="M9.20996 18.0936L9.58196 16.6406"
                                    stroke="#111"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></path>
                                  <path
                                    d="M2.25 10.125H1.5C1.08579 10.125 0.75 9.78921 0.75 9.375V3.375C0.75 2.96079 1.08579 2.625 1.5 2.625H22.5C22.9142 2.625 23.25 2.96079 23.25 3.375V9.375C23.25 9.78921 22.9142 10.125 22.5 10.125H20.25"
                                    stroke="#111"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></path>
                                </svg>
                              </div>
                              <span>Save your labour costs</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="section spdtb">
              <div className="block-blog">
                <div className="container">
                  <div className="heading align-center">
                    <h2 className="heading-title size-l">Latest News</h2>
                  </div>
                  <div className="row">
                    <div className="col-lg-4 col-sm-12">
                      <article className="post post-grid">
                        <div className="entry-thumbnail">
                          <a
                            href="#"
                            title="Top 6 Membership Sites for Beginners"
                          >
                            <img
                              src="https://salahtml.uxper.co/assets/images/post-01.jpg"
                              alt="Top 6 Membership Sites for Beginners"
                            />
                          </a>
                        </div>
                        <div className="entry-content">
                          <div className="entry-category">
                            <a href="#" title="Marketing">
                              Marketing
                            </a>
                            <a href="#" title="Creative">
                              Creative
                            </a>
                          </div>
                          <div className="entry-title">
                            <h3>
                              <a
                                href="#"
                                title="Top 6 Membership Sites for Beginners"
                              >
                                Top 6 Membership Sites for Beginners
                              </a>
                            </h3>
                          </div>
                        </div>
                      </article>
                    </div>
                    <div className="col-lg-4 col-sm-12">
                      <article className="post post-grid">
                        <div className="entry-thumbnail">
                          <a
                            href="#"
                            title="How to become a web designer in 2022"
                          >
                            <img
                              src="https://salahtml.uxper.co/assets/images/post-02.jpeg"
                              alt="How to become a web designer in 2022"
                            />
                          </a>
                        </div>
                        <div className="entry-content">
                          <div className="entry-category">
                            <a href="#" title="Tutorials">
                              Tutorials
                            </a>
                            <a href="#" title="Ui/Ux Design">
                              Ui/Ux Design
                            </a>
                          </div>
                          <div className="entry-title">
                            <h3>
                              <a
                                href="#"
                                title="How to become a web designer in 2022"
                              >
                                How to become a web designer in 2022
                              </a>
                            </h3>
                          </div>
                        </div>
                      </article>
                    </div>
                    <div className="col-lg-4 col-sm-12">
                      <article className="post post-grid">
                        <div className="entry-thumbnail">
                          <a
                            href="#"
                            title="20 best affiliate programs for online creators in 2022"
                          >
                            <img
                              src="https://salahtml.uxper.co/assets/images/post-03.jpeg"
                              alt="20 best affiliate programs for online creators in 2022"
                            />
                          </a>
                        </div>
                        <div className="entry-content">
                          <div className="entry-category">
                            <a href="#" title="Resources">
                              Resources
                            </a>
                            <a href="#" title="Tutorials">
                              Tutorials
                            </a>
                          </div>
                          <div className="entry-title">
                            <h3>
                              <a
                                href="#"
                                title="20 best affiliate programs for online creators in 2022"
                              >
                                20 best affiliate programs for online creators
                                in 2022
                              </a>
                            </h3>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
            </section> */}
          </div>
          {/* SITE CONTENT */}
        </main>
        {/* END SITE MAIN  */}

        {/* BEGIN SITE FOOTER */}
        {/* <footer id="footer" className="footer layout-03">
          <div className="footer-top">
            <div className="container">
              <div className="inner">
                <div className="row">
                  <div className="col-lg-5">
                    <div className="footer-item footer-about">
                      <div className="logo">
                        <a
                          title="Saturn"
                          target="_blank"
                          rel="noopener noreferrer"
                          href={saturnLandingPageLink}
                        >
                          <img
                            width={140}
                            height={50}
                            className="site-main-logo logo-retina"
                            src="https://saturnhq.io/wp-content/uploads/2023/11/Logo-final.png"
                            data-retina="https://saturnhq.io/wp-content/uploads/2023/11/Logo-final.png"
                            alt="Saturn"
                          />
                        </a>
                      </div>
                      <p>
                        A amazing WordPress theme designed specifically for a
                        startup, apps, business, SaaS, and IT services.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="footer-item footer-menu">
                      <h6>Company</h6>
                      <ul>
                        <li>
                          <a href="about-company.html" title="About us">
                            About us
                          </a>
                        </li>
                        <li>
                          <a href="blog-bg-grid.html" title="Blog">
                            Blog
                          </a>
                        </li>
                        <li>
                          <a href="careers.html" title="Careers">
                            Careers
                          </a>
                        </li>
                        <li>
                          <a href="#" title="Contact">
                            Contact
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="footer-item footer-menu">
                      <h6>Resources</h6>
                      <ul>
                        <li>
                          <a href="#" title="Downloads">
                            Downloads
                          </a>
                        </li>
                        <li>
                          <a href="#" title="Help Center">
                            Help Center
                          </a>
                        </li>
                        <li>
                          <a href="#" title="Partners">
                            Partners
                          </a>
                        </li>
                        <li>
                          <a href="#" title="Press Kit">
                            Press Kit
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="footer-item footer-menu">
                      <h6>Blog</h6>
                      <ul>
                        <li>
                          <a href="#" title="Business Stories">
                            Business Stories
                          </a>
                        </li>
                        <li>
                          <a href="#" title="Digital Store">
                            Digital Store
                          </a>
                        </li>
                        <li>
                          <a href="#" title="Learning">
                            Learning
                          </a>
                        </li>
                        <li>
                          <a href="#" title="Social Media">
                            Social Media
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="container">
              <div className="inner flex flex-content-sb flex-align-c">
                <div className="copyright">
                  © 2024 Saturn. All rights reserved
                </div>
              </div>
            </div>
          </div>
        </footer> */}
        {/* <!-- END SITE FOOTER  */}
      </div>
    </>
  );
};
