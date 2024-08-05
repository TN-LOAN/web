import React from 'react';
import Navbar from '@/components/common/navigation-bar';
import { PageLayout } from '@/components/common/pagelayout';
import { Button } from '@/components/common/button';

import { Link } from 'react-router-dom';
function IndexPage() {
 
  const sectionStyle1: React.CSSProperties = {
    backgroundImage: 'url(src/assets/Frame3.png)', 
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    minHeight: '200vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'flex-end', 
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
    position: 'relative',
    paddingBottom: '160px',

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
    borderRadius: '40px',
    marginBottom: '100px',
    
  };

  return (
    <PageLayout>
      <div style={navbarStyle}>
        <Navbar />
      </div>
      <div>
        <section style={sectionStyle1}>
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
