import React from 'react'

const styles = {
  wrapper:{
    background:'#1a1a1a',
    borderRadius:'12px',
    padding:'48px 32px',
    textAlign:'center',
    maxWidth:'800px',
    width:'100%',
    margin:'0 auto',
    fontFamily:"'Segoe UI', Arial, sans-serif",
  },
  heading:{
    color: '#ffffff',
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '12px',
    lineHeight: '1.3',
  },
  headingSpan:{
    color:'#c9a84c',
    fontStyle:'italic',
  },
  paragraph:{
    color:'#aaaaaa',
    fontSize:'13px',
    lineHeight:'1.6',
    marginBottom:'28px',
  },
  codeBox:{
    display: 'inline-block',
    border: '1.5px dashed #c9a84c',
    borderRadius: '8px',
    padding: '16px 48px',
    marginBottom: '28px',
  },
  codeLabel:{
    color: '#c9a84c',
    fontSize: '10px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    marginBottom: '8px',
  },
  codeValue:{
    color:'#ffffff',
    fontSize:'26px',
    fontWeight:'700',
    letterSpacing:'4px',
  },
  ctaBtn:{
    display:'inline-block',
    background:'#4ade80',
    color:'#111111',
    fontSize:'14px',
    fontWeight:'600',
    padding:'13px 30px',
    borderRadius:'6px',
    border:'none',
    cursor:'pointer',
    textDecoration:'none',
    marginTop:'8px',
  },
}

function DiscountBanner(){
  return (
    <div style={styles.wrapper}>
     <h1 style={styles.heading}>
        Get <span style={styles.headingSpan}>15% Off</span>Your First Order
      </h1>
      <p style={styles.paragraph}>
        New here? Use the code below and save on your first personalised gift.<br/>
        No minimum order required.
      </p>
      <div style={styles.codeBox}>
        <div style={styles.codeLabel}>Your Gift Code</div>
        <div style={styles.codeValue}>UPHAAR15</div>
      </div>
      <br/>
      <a style={styles.ctaBtn} href="https://wa.me/8439390374" target="_blank" rel="noreferrer">
        Claim Offer on WhatsApp →
      </a>
    </div>
  )
}
export default DiscountBanner;