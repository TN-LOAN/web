import React from 'react';
import Navbar from '@/components/common/navigation-bar';
import { PageLayout } from '@/components/common/pagelayout';
import { Button } from '@/components/common/button';

import { Link } from 'react-router-dom';
function IndexPage() {
 
  const sectionStyle1: React.CSSProperties = {
    backgroundImage: 'url(src/assets/Roadmap.png)', 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center',
    position: 'relative'
  };

  const sectionStyle2: React.CSSProperties = {
    backgroundImage: 'url(src/assets/Home.png)', 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', 
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', 
    color: 'white',
    textAlign: 'center',
    marginTop: '-50px', 
    position: 'relative',
    zIndex: 2 
  };

  const navbarStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000 
  };

  const buttonStyle: React.CSSProperties = {
    padding: '35px 35px', 
    fontSize: '1.5rem', 
    backgroundColor: '#1ECC83', 
    color: 'black',
    border: 'none',
    cursor: 'pointer',
    transform: 'translateY(70px)', 
    borderRadius: '40px',
    
  };

  return (
    <PageLayout>
      <div style={navbarStyle}>
        <Navbar />
      </div>
      <div>
        <section style={sectionStyle1}>
       
        </section>
        <section style={sectionStyle2}>
          <div>
          <Link to="/input">
            <Button style={buttonStyle} >
              สินเชื่อแนะนำ
            </Button>
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}

export default IndexPage;
