import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import Topbar from './Topbar';
import CustomiedGift from './CustomiedGift';
import FlashDeals from './FlashDeals';
import Banner from './Banner';
import PopularCategoris from './PopularCategoris';
import PersonalGift from './PersonalGift';
import TshirtColletions from './TshirtColletions';
import HoodiesColletions from './HoodiesColletions';
import CustomeGift from './CustomeGift';
import FeaturesProduct from './FeaturesProduct';
import RecommendProduct from './RecommendProduct';
import TopSellerTable from './TopSeller';
import MugTable from './MugsCollections';

const AdminLayout = () => {

  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "Topbar":
        return <>
          <Topbar />
        </>
      case "CustomizedGift":
        return (
          <>
            <CustomiedGift />
          </>
        );

      case "Flashdeals":
        return (
          <>
            <FlashDeals />
          </>

        )
      case "Banner":
        return (
          <>
            <Banner />
          </>
        )

      case "TopSeller":
        return (
          <>
            <TopSellerTable />
          </>
        )
      case "PopularCategories":
        return (
          <>
         <PopularCategoris/>
          </>
        )
      case "PersonalGift":
        return (
          <>
        <PersonalGift/>
          </>
        )
      case "Tshirt":
        return (
          <>
         <TshirtColletions/>
          </>
        )
      case "HoodiesCollection":
        return (
          <>
        <HoodiesColletions/>
          </>
        )
      case "CustomeGift":
        return (
          <>
         <CustomiedGift/>
          </>
        )
      case "MugCollection":
        return (
          <>
        <MugTable/>
          </>
        )
        case "FeaturedProducts":
          return (
            <>
        <FeaturesProduct/>
            </>
          )
          case "RecommendedProducts": 
          return(
            <>
         <RecommendProduct/>
            </>
          ) 

      default:
        return <><PopularCategoris/></>;
    }
  };

  const layoutStyle = {
    display: 'flex',
    minHeight: '100vh'
  };

  const contentStyle = {
    flexGrow: 1,
    padding: '30px',
    backgroundColor: '#ecf0f1'
  };

  return (
    <div style={layoutStyle}>
      <AdminSidebar onTabChange={setActiveTab} />
      <main style={contentStyle}>
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminLayout;
