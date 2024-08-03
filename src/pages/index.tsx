import React from 'react';
import Navbar from '@/components/common/navigation-bar';
import { PageLayout } from '@/components/common/pagelayout';
import { Button } from '@/components/common/button';

function IndexPage() {

  const sectionStyle1: React.CSSProperties = {
    backgroundImage: 'url(src/assets/Home.png)', 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', 
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center'
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
    textAlign: 'center'
  };

  const navbarStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000 
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    backgroundColor: '#1ECC83', 
    color: 'black',
    border: 'none',
    cursor: 'pointer'
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
           
            <Button style={buttonStyle} onClick={() => console.log('Button clicked')}>
              สินเชื่อแนะนำ
            </Button>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}

export default IndexPage;
