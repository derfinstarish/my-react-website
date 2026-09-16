import React, { useState } from 'react';
import logo from './Logo.jpeg';
import tiloring from './tiloring.jpeg';
import importing from './importing.jpg';
const portfolioStyles = `
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f5f7fb; color: #1a1a1a; }
  a { text-decoration: none; }

  .portfolio-shell {
    background: linear-gradient(180deg, #07111f 0%, #0d1d31 12%, #f5f7fb 12%, #f5f7fb 100%);
    min-height: 100vh;
    color: #172433;
  }

  .container {
    width: min(1200px, calc(100% - 32px));
    margin: 0 auto;
  }

  .navbar {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: rgba(7, 17, 31, 0.85);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  .nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 0;
    gap: 20px;
    min-height: 92px;
  }

  .navbar-custom {
    background: rgba(7, 17, 31, 0.85);
    border-bottom: 1px solid rgba(255,255,255,0.08);
    backdrop-filter: blur(14px);
    padding: 0;
  }

  .navbar-custom .container {
    max-width: 1200px;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 14px;
    color: #fff;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin-right: auto;
  }

  .brand-mark {
    width: 52px;
    height: 52px;
    border-radius: 16px;
    background: linear-gradient(135deg, #ffb703, #f77f00, #ff7f50);
    overflow: hidden;
    display: grid;
    place-items: center;
    box-shadow: 0 18px 35px rgba(255, 146, 40, 0.45);
    animation: pulseGlow 2s ease-in-out infinite;
  }

  .brand-mark img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }

  .brand-text {
    display: flex;
    flex-direction: column;
    font-size: 0.8rem;
  }

  .brand-text strong {
    font-size: 0.92rem;
    line-height: 1.2;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 22px;
    flex-wrap: wrap;
  }

  .navbar-nav {
    align-items: center;
    gap: 22px;
  }

  .navbar-collapse {
    flex-grow: 1;
  }

  .nav-link {
    color: rgba(255,255,255,0.74) !important;
    font-size: 0.96rem;
    padding: 0 !important;
    transition: 0.25s ease;
    position: relative;
  }

  .nav-link:hover,
  .nav-link:focus {
    color: #fff !important;
  }

  .nav-link::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #ffb703, #f77f00);
    transition: width 0.3s ease;
  }

  .nav-link:hover::after,
  .nav-link:focus::after {
    width: 100%;
  }

  .navbar-toggler {
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 12px;
    background: rgba(255,255,255,0.04);
    padding: 8px 10px;
  }

  .navbar-toggler:focus {
    box-shadow: none;
  }

  .navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255,255,255,1%29' stroke-linecap='round' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
  }

  .nav-links a::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #ffb703, #f77f00);
    transition: width 0.3s ease;
  }

  .nav-links a:hover {
    color: #fff;
  }

  .nav-links a:hover::after {
    width: 100%;
  }

  .nav-links a:focus-visible,
  .primary-btn:focus-visible,
  .secondary-btn:focus-visible,
  .nav-cta:focus-visible {
    outline: 2px solid #ffd166;
    outline-offset: 3px;
  }

  .nav-cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    border: none;
    background: linear-gradient(135deg, #ffb703, #f77f00);
    color: #fff;
    font-weight: 800;
    padding: 12px 18px;
    border-radius: 999px;
    cursor: pointer;
    box-shadow: 0 16px 30px rgba(247, 127, 0, 0.3);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  .nav-cta:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 20px 36px rgba(247, 127, 0, 0.4);
  }

  .nav-cta-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(255,255,255,0.18);
    color: #fff;
    border: 1px solid rgba(255,255,255,0.22);
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 4px 8px;
    border-radius: 999px;
  }

  .hero {
    padding: 72px 0 52px;
    background: linear-gradient(180deg, #07111f 0%, #0d1d31 100%);
  }

  .hero-row {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 40px;
    align-items: center;
  }

  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: rgba(255,255,255,0.08);
    color: #ffd166;
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 999px;
    padding: 9px 14px;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .hero-copy {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .hero-copy h1 {
    margin: 20px 0 18px;
    color: #fff;
    font-size: clamp(2.6rem, 4vw, 4.8rem);
    line-height: 1.01;
    letter-spacing: -0.05em;
  }

  .hero-copy p {
    color: rgba(255,255,255,0.8);
    font-size: 1.08rem;
    line-height: 1.8;
    margin: 0 0 28px;
    max-width: 620px;
  }

  .hero-actions {
    display: flex;
    align-items: center;
    gap: 18px;
    flex-wrap: wrap;
  }

  .primary-btn, .secondary-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 16px 24px;
    border-radius: 999px;
    font-weight: 800;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    cursor: pointer;
  }

  .primary-btn {
    background: linear-gradient(135deg, #ffb703, #f77f00);
    color: #fff;
    box-shadow: 0 20px 35px rgba(247, 127, 0, 0.3);
  }

  .secondary-btn {
    background: rgba(255,255,255,0.06);
    color: #fff;
    border: 1px solid rgba(255,255,255,0.12);
  }

  .primary-btn:hover, .secondary-btn:hover {
    transform: translateY(-3px);
  }

  .hero-stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(120px, 1fr));
    gap: 18px;
    margin-top: 32px;
    margin-bottom: -20px;
    max-width: 560px;
    width: 100%;
    padding: 18px 18px 14px;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(15, 23, 42, 0.04);
    border-radius: 26px;
    box-shadow: 0 28px 55px rgba(15, 23, 42, 0.12);
    backdrop-filter: blur(10px);
    visibility: visible;
    opacity: 1;
    position: relative;
    z-index: 3;
    transform: translateY(20px);
  }

  .stat-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    visibility: visible;
    opacity: 1;
    background: linear-gradient(180deg, #ffffff 0%, #f5f8ff 100%);
    border: 1px solid rgba(100, 116, 139, 0.12);
    border-radius: 18px;
    padding: 18px 14px 16px;
    color: #0f172a;
    min-height: 102px;
    box-shadow: 0 12px 24px rgba(15, 23, 42, 0.06);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  .stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 28px rgba(15, 23, 42, 0.12);
  }

  .stat-card strong {
    display: block;
    font-size: 22px;
    margin-bottom: 8px;
    color: #0b1d31;
  }

  .stat-card span {
    color: #5b6b80;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 700;
  }

  .hero-visual {
    position: relative;
    min-height: 550px;
  }

  .main-image {
    position: absolute;
    inset: 10px 0 0 40px;
    border-radius: 30px;
    overflow: hidden;
    width: calc(100% - 40px);
    height: calc(100% - 10px);
    display: block;
    object-fit: cover;
    box-shadow: 0 40px 70px rgba(8, 19, 35, 0.45);
    transform: perspective(1000px) rotateY(-10deg) rotateX(3deg);
    animation: floatCard 7s ease-in-out infinite;
  }

  .floating-badge {
    position: absolute;
    background: rgba(255,255,255,0.92);
    box-shadow: 0 18px 32px rgba(10,20,35,0.12);
    border-radius: 18px;
    padding: 16px 18px;
    animation: drift 5s ease-in-out infinite;
  }

  .floating-badge.top {
    top: 22px;
    right: 8px;
    color: #0b1d31;
  }

  .floating-badge.bottom {
    left: 0;
    bottom: 28px;
    color: #0b1d31;
  }

  .floating-badge strong {
    display: block;
    font-size: 1.5rem;
    font-weight: 900;
    color: #f77f00;
  }

  .floating-badge span {
    font-size: 0.83rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #64748b;
  }

  .section {
    padding: 90px 0;
  }

  .section-heading {
    text-align: center;
    margin-bottom: 38px;
  }

  .section-heading .kicker {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #f77f00;
  }

  .section-heading h2 {
    margin: 12px 0 12px;
    font-size: clamp(2rem, 2.5vw, 3rem);
    letter-spacing: -0.04em;
    color: #112136;
  }

  .section-heading p {
    width: min(680px, 90%);
    margin: 0 auto;
    color: #516072;
    line-height: 1.8;
    font-size: 1.02rem;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(220px, 1fr));
    gap: 22px;
  }

  .service-card {
    position: relative;
    background: linear-gradient(180deg, rgba(255,255,255,0.9), rgba(242,245,249,1));
    border: 1px solid rgba(15, 23, 42, 0.06);
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 22px 40px rgba(15, 23, 42, 0.06);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    min-height: 290px;
  }

  .service-card:hover {
    transform: translateY(-8px) scale(1.01);
    box-shadow: 0 26px 48px rgba(15, 23, 42, 0.12);
  }

  .service-image {
    width: 100%;
    height: 150px;
    display: block;
    object-fit: cover;
    position: relative;
  }

  .service-image::after {
    content: '→';
    position: absolute;
    right: 16px;
    bottom: 16px;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: rgba(255,255,255,0.92);
    color: #0b1d31;
    display: grid;
    place-items: center;
    font-size: 1.2rem;
    font-weight: 900;
  }

  .service-body {
    padding: 20px 18px 24px;
  }

  .service-body h3 {
    margin: 0 0 10px;
    font-size: 1.2rem;
    color: #0f172a;
  }

  .service-body p {
    margin: 0;
    color: #516072;
    font-size: 0.96rem;
    line-height: 1.7;
  }

  .about-band {
    background: linear-gradient(135deg, #0b1d31 0%, #182c45 100%);
    border-radius: 36px;
    padding: 24px;
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 28px;
    box-shadow: 0 30px 50px rgba(15, 23, 42, 0.15);
    overflow: hidden;
  }

  .about-copy {
    color: #e5edf7;
    padding: 16px 14px;
  }

  .about-copy h3 {
    font-size: clamp(1.8rem, 2.2vw, 2.8rem);
    letter-spacing: -0.04em;
    margin: 0 0 14px;
  }

  .about-copy p {
    color: rgba(229, 237, 247, 0.8);
    line-height: 1.9;
    margin: 0 0 28px;
  }

  .feature-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(150px, 1fr));
    gap: 16px;
  }

  .feature-item {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    padding: 16px;
    color: #f8fbff;
  }

  .feature-item strong {
    display: block;
    font-size: 1.4rem;
    color: #ffd166;
    margin-bottom: 6px;
  }

  .feature-item span {
    color: rgba(255,255,255,0.8);
    font-size: 0.9rem;
  }

  .about-gallery {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
    align-items: center;
  }

  .about-photo {
    width: 100%;
    min-height: 260px;
    height: 260px;
    display: block;
    object-fit: cover;
    border-radius: 26px;
    box-shadow: 0 26px 45px rgba(0,0,0,0.2);
  }

  .contact-strip {
    padding: 0 0 70px;
  }

  .contact-panel {
    background: linear-gradient(135deg, #ffb703 0%, #f77f00 100%);
    color: #0c1726;
    border-radius: 28px;
    padding: 32px 34px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    box-shadow: 0 30px 50px rgba(247,127,0,0.25);
  }

  .contact-panel h3 {
    margin: 0 0 8px;
    font-size: clamp(1.7rem, 2vw, 2.5rem);
    letter-spacing: -0.04em;
  }

  .contact-panel p {
    margin: 0;
    font-weight: 600;
    color: rgba(12, 23, 38, 0.8);
  }

  .footer {
    background: #07111f;
    color: #e4ebf7;
    padding: 46px 0 22px;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr 1fr;
    gap: 28px;
    align-items: flex-start;
  }

  .footer-brand h3 {
    margin: 0 0 8px;
    color: #fff;
    font-size: 1.3rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .footer-brand p,
  .footer-links li,
  .footer-contact li {
    color: rgba(228,235,247,0.72);
    line-height: 1.9;
    list-style: none;
  }

  .footer-links ul,
  .footer-contact ul {
    padding: 0;
    margin: 0;
  }

  .footer-links a {
    color: #fff;
    text-decoration: none;
  }

  .footer-links a:hover,
  .footer-links a:focus,
  .footer-links a:visited {
    color: #fff;
    text-decoration: none;
  }

  .footer-links h4,
  .footer-contact h4 {
    margin: 0 0 12px;
    font-size: 1rem;
    color: #fff;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .footer-contact li strong {
    color: #ffd166;
  }

  .footer-bottom {
    margin-top: 30px;
    border-top: 1px solid rgba(255,255,255,0.1);
    padding-top: 18px;
    text-align: center;
    color: rgba(228,235,247,0.7);
    font-size: 0.92rem;
  }

  @keyframes pulseGlow {
    0%, 100% { transform: scale(1); box-shadow: 0 18px 35px rgba(255, 146, 40, 0.45); }
    50% { transform: scale(1.08); box-shadow: 0 20px 42px rgba(255, 146, 40, 0.7); }
  }

  @keyframes floatCard {
    0%, 100% { transform: perspective(1000px) rotateY(-10deg) rotateX(3deg) translateY(0px); }
    50% { transform: perspective(1000px) rotateY(-8deg) rotateX(0deg) translateY(-10px); }
  }

  @keyframes drift {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
  }

  @media (max-width: 980px) {
    .container {
      width: min(1200px, calc(100% - 24px));
    }

    .hero {
      padding-top: 72px;
    }

    .hero-row,
    .about-band,
    .footer-grid {
      grid-template-columns: 1fr;
    }

    .hero-copy {
      align-items: center;
      text-align: center;
    }

    .hero-copy p {
      max-width: 100%;
    }

    .hero-actions {
      justify-content: center;
    }

    .hero-stats {
      max-width: 100%;
      margin: 28px auto 0;
      transform: none;
    }

    .services-grid {
      grid-template-columns: repeat(2, minmax(220px, 1fr));
    }

    .hero-visual {
      min-height: 420px;
      width: min(100%, 420px);
      margin: 0 auto;
    }

    .main-image {
      inset: 0;
      width: 100%;
      height: 100%;
      transform: none;
      border-radius: 24px;
    }

    .floating-badge {
      transform: scale(0.9);
    }
  }

  @media (max-width: 991px) {
    .desktop-cta {
      display: none !important;
    }

    .navbar-nav {
      width: 100%;
      align-items: flex-start;
      gap: 8px;
      padding-top: 12px;
    }

    .nav-item {
      width: 100%;
    }

    .nav-link {
      display: inline-block;
      width: 100%;
      padding: 8px 0 !important;
    }

    .mobile-cta {
      display: inline-flex !important;
      width: 100%;
      justify-content: center;
      margin-top: 8px;
    }
  }

  @media (min-width: 992px) {
    .mobile-cta {
      display: none !important;
    }
  }

  @media (max-width: 640px) {
    .container {
      width: min(100%, calc(100% - 20px));
    }

    .nav-inner {
      gap: 12px;
      padding: 10px 0;
      min-height: 68px;
      flex-wrap: nowrap;
      align-items: center;
    }

    .navbar-collapse {
      width: 100%;
    }

    .brand {
      width: auto;
      justify-content: flex-start;
      margin-right: 0;
      flex: 1;
      min-width: 0;
    }

    .brand-mark {
      width: 38px;
      height: 38px;
      border-radius: 12px;
      flex-shrink: 0;
    }

    .brand-text strong {
      font-size: 0.68rem;
    }

    .brand-text span {
      font-size: 0.56rem;
    }

    .navbar-toggler {
      margin-left: auto;
      padding: 6px 8px;
    }

    .hero {
      padding-top: 20px;
      padding-bottom: 16px;
    }

    .hero-copy h1 {
      font-size: clamp(2.2rem, 9vw, 3.1rem);
      margin-top: 12px;
    }

    .hero-copy p {
      font-size: 0.96rem;
      line-height: 1.7;
      margin-bottom: 18px;
    }

    .hero-actions {
      width: 100%;
      flex-direction: column;
      align-items: stretch;
    }

    .primary-btn,
    .secondary-btn {
      width: 100%;
    }

    .services-grid,
    .feature-list {
      grid-template-columns: 1fr;
    }

    .hero-stats {
      grid-template-columns: 1fr;
      gap: 12px;
      padding: 12px;
      margin-top: 20px;
    }

    .stat-card {
      min-height: 88px;
      padding: 16px 14px;
    }

    .floating-badge {
      display: none;
    }

    .hero-visual {
      min-height: 320px;
      width: min(100%, 360px);
      margin: 0 auto;
    }

    .contact-panel {
      flex-direction: column;
      align-items: flex-start;
      padding: 24px 18px;
    }

    /* Position the consultation modal cancel button above the card on small screens. */
    .consultation-modal .modal-content,
    .consultation-card,
    .booking-card {
      position: relative;
      margin-top: 40px;
    }

    .consultation-modal .btn-close,
    .consultation-modal .cancel-btn,
    .consultation-card .cancel-btn,
    .booking-card .cancel-btn {
      position: absolute;
      top: -34px;
      right: 0;
      z-index: 5;
      display: inline-flex !important;
      align-items: center;
      justify-content: center;
      min-height: 32px;
      padding: 6px 12px;
      color: #374151 !important;
      background-color: transparent !important;
      border: 0 !important;
      opacity: 1;
      visibility: visible !important;
      pointer-events: auto;
    }
  }
`;

export function Portfolio({ onOpenConsultation }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const consultationServices = [
    'Building Constructions',
    'Export & Import',
    'Real Estate',
    'Legal Service',
    'E-Services',
    'All Types of Approvals',
    'Abroad Studies & Jobs',
    'Finance',
    'Textiles',
    'Tailoring',
  ];

  const openConsultation = () => onOpenConsultation({ services: consultationServices });

  return (
    <>
      <style>{portfolioStyles}</style>
      <div className="portfolio-shell" data-testid="portfolio-shell">
        <header className="navbar navbar-custom navbar-expand-lg navbar-dark sticky-top">
          <div className="container nav-inner">
            <div className="brand navbar-brand" aria-label="Rishion Groups of Companies logo">
              <div className="brand-mark">
                <img src={logo} alt="Rishion Groups logo" />
              </div>
              <div className="brand-text">
                <strong>RISHION GROUPS</strong>
                <span>OF COMPANIES</span>
              </div>
            </div>

            <button
              type="button"
              className="navbar-toggler"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
              <ul className="navbar-nav ms-auto align-items-lg-center">
                <li className="nav-item"><a className="nav-link" href="#home" onClick={() => setIsMenuOpen(false)}>Home</a></li>
                <li className="nav-item"><a className="nav-link" href="#about" onClick={() => setIsMenuOpen(false)}>About</a></li>
                <li className="nav-item"><a className="nav-link" href="#services" onClick={() => setIsMenuOpen(false)}>Services</a></li>
                <li className="nav-item"><a className="nav-link" href="#projects" onClick={() => setIsMenuOpen(false)}>Projects</a></li>
                <li className="nav-item"><a className="nav-link" href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
                <li className="nav-item mobile-cta">
                  <button type="button" className="nav-cta" aria-label="Book consultation" onClick={openConsultation}>
                    <span>Book Consultation</span>
                  </button>
                </li>
              </ul>
            </div>

            <button type="button" className="nav-cta desktop-cta" aria-label="Book consultation" onClick={openConsultation}>
              <span>Book Consultation</span>
            </button>
          </div>
        </header>

        <main id="home">
          <section className="hero">
            <div className="container hero-row">
              <div className="hero-copy">
                <div className="eyebrow">Trusted growth partner</div>
                <h1>Building Futures with Trust, Vision & Excellence.</h1>
                <p>
                  RISHION GROUPS OF COMPANIES brings together expertise in construction,
                  trade, legal assistance, approvals, finance, real estate, overseas support,
                  textiles and tailored services to help individuals and businesses move forward.
                </p>
                <div className="hero-actions">
                  <a href="#services" className="primary-btn">Explore Services</a>
                  <a href="#contact" className="secondary-btn">Talk to Us</a>
                </div>

                <div className="hero-stats">
                  <div className="stat-card">
                    <strong>08+</strong>
                    <span>Years</span>
                  </div>
                  <div className="stat-card">
                    <strong>500+</strong>
                    <span>Clients</span>
                  </div>
                  <div className="stat-card">
                    <strong>100%</strong>
                    <span>Commitment</span>
                  </div>
                </div>
              </div>

              <div className="hero-visual" aria-label="Business showcase">
                <img className="main-image" src={logo} alt="Rishion Groups logo" />
                <div className="floating-badge top">
                  <strong>24/7</strong>
                  <span>Client Support</span>
                </div>
                <div className="floating-badge bottom">
                  <strong>50+</strong>
                  <span>Business Solutions</span>
                </div>
              </div>
            </div>
          </section>

          <section className="section" id="services">
            <div className="container">
              <div className="section-heading">
                <span className="kicker">Our Services</span>
                <h2>Integrated Business Solutions Under One Roof</h2>
                <p>
                  We support every stage of growth—from planning and approvals to funding, property,
                  overseas assistance, and professional services that simplify complex needs.
                </p>
              </div>

              <div className="services-grid">
                <article className="service-card">
                  <img className="service-image" src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80" alt="Building constructions" />
                  <div className="service-body">
                    <h3>Building Constructions</h3>
                    <p>Complete construction guidance, site planning, project execution and quality-focused delivery.</p>
                  </div>
                </article>

                <article className="service-card">
                  <img className="service-image" src={importing} alt="Export and import" />
                  <div className="service-body">
                    <h3>Export & Import</h3>
                    <p>End-to-end international trade support with sourcing, documentation and shipment coordination.</p>
                  </div>
                </article>

                <article className="service-card">
                  <img className="service-image" src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80" alt="Legal service" />
                  <div className="service-body">
                    <h3>Legal Service</h3>
                    <p>Reliable legal consultation and compliance support for a secure and smooth business journey.</p>
                  </div>
                </article>

                <article className="service-card">
                  <img className="service-image" src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80" alt="Approvals and documentation" />
                  <div className="service-body">
                    <h3>All Types of Approvals</h3>
                    <p>Assistance for licenses, permits and approvals required for business and construction success.</p>
                  </div>
                </article>

                <article className="service-card">
                  <img className="service-image" src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=900&q=80" alt="Finance" />
                  <div className="service-body">
                    <h3>Finance</h3>
                    <p>Professional financial strategy and planning guidance for sustainable growth and stability.</p>
                  </div>
                </article>

                <article className="service-card">
                  <img className="service-image" src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=900&q=80" alt="Loans and financial planning" />
                  <div className="service-body">
                    <h3>All Types of Loans</h3>
                    <p>Support in securing the right lending options for personal, business and investment needs.</p>
                  </div>
                </article>

                <article className="service-card">
                  <img className="service-image" src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80" alt="Real estate property" />
                  <div className="service-body">
                    <h3>Real Estate</h3>
                    <p>Property opportunities, sales support and advisory for buyers, investors and developers.</p>
                  </div>
                </article>

                <article className="service-card">
                  <img className="service-image" src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80" alt="Digital e-services" />
                  <div className="service-body">
                    <h3>E-Services</h3>
                    <p>Fast digital support for registrations, documentation, government services and online processes.</p>
                  </div>
                </article>

                
              </div>
            </div>
          </section>

          <section className="section" id="about">
            <div className="container">
              <div className="about-band">
                <div className="about-copy">
                  <span className="kicker" style={{ color: '#ffd166' }}>Why choose us</span>
                  <h3>We create solutions that move businesses and lives forward.</h3>
                  <p>
                    At RISHION GROUPS OF COMPANIES, we combine practical experience with a client-first approach.
                    Whether you need construction support, legal clarity, overseas guidance, job assistance, or financing,
                    our team delivers informed support and personalized strategies built around your goals.
                  </p>
                  <div className="feature-list">
                    <div className="feature-item">
                      <strong>100%</strong>
                      <span>Transparent guidance</span>
                    </div>
                    <div className="feature-item">
                      <strong>24/7</strong>
                      <span>Responsive support</span>
                    </div>
                    <div className="feature-item">
                      <strong>Multi</strong>
                      <span>Service expertise</span>
                    </div>
                    <div className="feature-item">
                      <strong>Goal</strong>
                      <span>Driven execution</span>
                    </div>
                  </div>
                </div>

                <div className="about-gallery">
                  <img className="about-photo" src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80" alt="Business excellence" />
                  <img className="about-photo" src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80" alt="Team and collaboration" />
                </div>
              </div>
            </div>
          </section>

          <section className="section" id="projects">
            <div className="container">
              <div className="section-heading">
                <span className="kicker">What we deliver</span>
                <h2>Business growth, personal progress, global reach</h2>
                <p>
                  From real estate opportunities to overseas services and jobs, we connect people to the right opportunities
                  and support them with expert directions at every step.
                </p>
              </div>

              <div className="services-grid">
                <article className="service-card">
                  <img className="service-image" src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=80" alt="Abroad travel service" />
                  <div className="service-body">
                    <h3>Abroad Service</h3>
                    <p>Career, migration, and relocation support to help you move confidently across borders.</p>
                  </div>
                </article>

                <article className="service-card">
                  <img className="service-image" src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80" alt="Jobs and careers" />
                  <div className="service-body">
                    <h3>Jobs</h3>
                    <p>Guidance for employment opportunities and career connections that match your potential.</p>
                  </div>
                </article>

                <article className="service-card">
                  <img className="service-image" src={tiloring} alt="Textiles and tailoring" />
                  <div className="service-body">
                    <h3>Textiles & Tailoring</h3>
                    <p>Fashion, custom tailoring and textile solutions designed for quality and style.</p>
                  </div>
                </article>

                <article className="service-card">
                  <img className="service-image" src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80" alt="Business support team" />
                  <div className="service-body">
                    <h3>Business Support</h3>
                    <p>Strategic support for entrepreneurs seeking trusted advisory and execution assistance.</p>
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section className="contact-strip" id="contact">
            <div className="container">
              <div className="contact-panel">
                <div>
                  <h3>Need a reliable partner for your next step?</h3>
                  <p>Let’s build your future with confidence and clarity.</p>
                </div>
                <button type="button" className="nav-cta" aria-label="Book consultation" onClick={openConsultation}>Book Consultation</button>
              </div>
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-brand">
                <div className="brand" style={{ justifyContent: 'flex-start', marginBottom: '20px' }}>
                <div className="brand-mark">
                       <img src={logo} alt="Rishion Groups logo" />
                </div>
                  <div className="brand-text">
                    <strong>RISHION GROUPS</strong>
                    <span>OF COMPANIES</span>
                  </div>
                </div>
                <p>
                  Delivering trusted solutions in construction, trade, legal matters, approvals, finance,
                  real estate, overseas services and business support for long-term success.
                </p>
              </div>

              <div className="footer-links">
                <h4>Quick Links</h4>
                <ul>
                  <li><a href="#services">Building Constructions</a></li>
                  <li><a href="#services">Export & Import</a></li>
                  <li><a href="#services">Legal Service</a></li>
                  <li><a href="#services">Finance & Loans</a></li>
                  <li><a href="#services">Real Estate</a></li>
                </ul>
              </div>

              <div className="footer-contact">
                <h4>Contact Us</h4>
                <ul>
                  <li><strong>Proprietor:</strong> Mr.A.Pravin JabaKumar</li>
                  <li><strong>Contact:</strong> +91 9600416662</li>
                  <li><strong>Address:</strong>c/5, Selva tower Veppamoodu Junction, Nagercoil,Kanyakumari dist,TamilNadu- 629002</li>
                </ul>
              </div>
            </div>

            <div className="footer-bottom">
              © 2025 RISHION GROUPS OF COMPANIES. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Portfolio;
