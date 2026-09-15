import React, { useState } from 'react';

const consultationStyles = `
  * { box-sizing: border-box; }
  body { margin: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
  .consultation-page {
    min-height: 100vh;
    background: linear-gradient(180deg, #07111f 0%, #0e1d31 22%, #f5f7fb 22%, #f5f7fb 100%);
    color: #122033;
    padding: 40px 0 80px;
  }

  .consultation-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(7, 17, 31, 0.68);
    backdrop-filter: blur(8px);
    display: grid;
    place-items: center;
    padding: 20px;
    z-index: 1200;
    overflow-y: auto;
  }

  .consultation-container {
    width: min(1100px, calc(100% - 32px));
    margin: 0 auto;
    padding: 20px 0;
  }

  .consultation-card {
    background: #ffffff;
    border-radius: 30px;
    box-shadow: 0 30px 60px rgba(17, 33, 54, 0.12);
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 1.05fr;
    max-width: 1050px;
    margin: 0 auto;
  }

  .consultation-info {
    background: linear-gradient(180deg, #0b1d31 0%, #18314d 100%);
    padding: 42px 32px;
    color: #edf4ff;
  }

  .consultation-info .eyebrow {
    display: inline-block;
    background: rgba(255,255,255,0.08);
    color: #ffd166;
    border: 1px solid rgba(255,255,255,0.12);
    padding: 10px 16px;
    border-radius: 999px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-size: 0.72rem;
  }

  .consultation-info h1 {
    margin: 20px 0 18px;
    font-size: clamp(2.2rem, 3vw, 3.3rem);
    line-height: 1.07;
    letter-spacing: -0.05em;
  }

  .consultation-info p {
    color: rgba(237, 244, 255, 0.8);
    line-height: 1.8;
    margin: 0 0 26px;
  }

  .consultation-points {
    display: grid;
    gap: 14px;
  }

  .consultation-point {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    padding: 14px 16px;
    color: #edf4ff;
  }

  .point-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ffb703, #f77f00);
    margin-top: 7px;
    flex-shrink: 0;
  }

  .consultation-form-wrap {
    padding: 36px 30px;
    background: #f8fafc;
  }

  .consultation-form {
    display: grid;
    gap: 18px;
  }

  .form-row {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
  }

  .field {
    display: grid;
    gap: 8px;
  }

  .field label {
    font-weight: 700;
    color: #1d2a39;
    font-size: 0.9rem;
  }

  .field input,
  .field select,
  .field textarea {
    width: 100%;
    border: 1px solid #dfe6ef;
    border-radius: 14px;
    padding: 14px 16px;
    font: inherit;
    background: #fff;
    color: #102033;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .field input:focus,
  .field select:focus,
  .field textarea:focus {
    outline: none;
    border-color: #f77f00;
    box-shadow: 0 0 0 4px rgba(247, 127, 0, 0.14);
  }

  .field textarea {
    min-height: 130px;
    resize: vertical;
  }

  .submit-btn {
    border: none;
    background: linear-gradient(135deg, #ffb703, #f77f00);
    color: #fff;
    padding: 16px 20px;
    border-radius: 999px;
    font-weight: 800;
    cursor: pointer;
    box-shadow: 0 18px 30px rgba(247,127,0,0.25);
    transition: transform 0.2s ease;
  }

  .submit-btn:hover {
    transform: translateY(-2px);
  }

  .success-banner {
    margin-top: 0;
    background: #e8f9ee;
    color: #126b3d;
    border: 1px solid #bde8ca;
    padding: 12px 14px;
    border-radius: 12px;
    font-weight: 600;
  }

  .redirecting-note {
    font-size: 0.85rem;
    color: #4b5d73;
    margin-top: 8px;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 18px;
    color: #0b1d31;
    text-decoration: none;
    font-weight: 700;
  }

  .modal-close-btn {
    position: absolute;
    top: 18px;
    right: 18px;
    width: 40px;
    height: 40px;
    border-radius: 999px;
    border: none;
    background: rgba(255, 255, 255, 0.18);
    color: #fff;
    font-size: 1.5rem;
    cursor: pointer;
    display: grid;
    place-items: center;
    z-index: 2;
  }

  @media (max-width: 860px) {
    .consultation-modal-backdrop {
      padding: 12px;
      align-items: flex-start;
    }

    .consultation-container {
      width: min(100%, calc(100% - 8px));
      padding: 8px 0 20px;
    }

    .consultation-card {
      grid-template-columns: 1fr;
    }

    .form-row {
      grid-template-columns: 1fr;
    }
  }
`;

function ConsultationPage({ onBack, isModal = false }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const customerMessage = [
      'Hello Rishion Groups,',
      '',
      'I would like to book a consultation.',
      `Name: ${data.fullName || 'Not provided'}`,
      `Phone: ${data.phone || 'Not provided'}`,
      `Email: ${data.email || 'Not provided'}`,
      `Service: ${data.service || 'Not provided'}`,
      `Details: ${data.message || 'No additional details'}`,
    ].join('\n');

    const customerWhatsAppUrl = `https://wa.me/919600416662?text=${encodeURIComponent(customerMessage)}`;

    setSubmitted(true);

    try {
      await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: data.fullName,
          phone: data.phone,
          email: data.email,
          service: data.service,
          message: data.message,
        }),
      });

      form.reset();

      setTimeout(() => {
        window.open(customerWhatsAppUrl, '_blank', 'noopener,noreferrer');
      }, 1200);
    } catch (error) {
      console.error('Consultation submission failed:', error);
    }
  };

  const content = (
    <div className="consultation-card">
      <div className="consultation-info">
        <div className="eyebrow">Consultation</div>
        <h1>Book Your Consultation</h1>
        <p>
          Share your requirements and our team will connect with you to guide the best path
          for your construction, legal, finance, real estate, or business support needs.
        </p>

        <div className="consultation-points">
          <div className="consultation-point">
            <span className="point-dot" />
            <span>Personalized guidance from experienced professionals</span>
          </div>
          <div className="consultation-point">
            <span className="point-dot" />
            <span>Quick response for approvals, loans, and business planning</span>
          </div>
          <div className="consultation-point">
            <span className="point-dot" />
            <span>Flexible consultation for individuals and businesses</span>
          </div>
        </div>
      </div>

      <div className="consultation-form-wrap">
        <form className="consultation-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="field">
              <label htmlFor="fullName">Full Name</label>
              <input id="fullName" name="fullName" type="text" placeholder="Enter your name" required />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone Number</label>
              <input id="phone" name="phone" type="tel" placeholder="Enter your phone" required />
            </div>
          </div>

          <div className="form-row">
            <div className="field">
              <label htmlFor="email">Email Address</label>
              <input id="email" name="email" type="email" placeholder="Enter your email" required />
            </div>
            <div className="field">
              <label htmlFor="service">Service Needed</label>
              <select id="service" name="service" defaultValue="" required>
                <option value="" disabled>Select a service</option>
                <option>Building Constructions</option>
                <option>Export & Import</option>
                <option>Legal Service</option>
                <option>Finance</option>
                <option>Real Estate</option>
                <option>Abroad Service</option>
                <option>Business Support</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="message">Project Details</label>
            <textarea id="message" name="message" placeholder="Tell us about your requirements or goals" required />
          </div>

          <button type="submit" className="submit-btn">Submit Request</button>

          {submitted && (
            <div className="success-banner">
              Booking confirmed! Your request has been received successfully.
            </div>
          )}
        </form>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <>
        <style>{consultationStyles}</style>
        <div className="consultation-modal-backdrop" role="dialog" aria-modal="true" aria-label="Book consultation">
          <div style={{ position: 'relative', width: '100%' }}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={onBack}
              aria-label="Close consultation form"
            >
              ×
            </button>
            <div className="consultation-container">{content}</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{consultationStyles}</style>
      <div className="consultation-page">
        <div className="consultation-container">
          <button
            type="button"
            className="back-link"
            onClick={onBack}
            aria-label="Go back to home"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              font: 'inherit',
              padding: 0,
            }}
          >
            ← Back to home
          </button>
          {content}
        </div>
      </div>
    </>
  );
}

export default ConsultationPage;
