import { useState } from "react";
import ContestCard from "./ContestCard";

const ContestTabs = ({ contests }) => {
  const [activeTab, setActiveTab] = useState("pending");
  
  const pendingContests = contests.filter(c => c.status === "pending");
  const upcomingContests = contests.filter(c => c.status === "upcoming");
  const pastContests = contests.filter(c => c.status === "past");

  return (
    <div className="contest-tabs">
      <div className="tabs-header">
        <button 
          className={`tab-btn ${activeTab === "pending" ? "active" : ""}`}
          onClick={() => setActiveTab("pending")}
        >
          Pending
        </button>
        <button 
          className={`tab-btn ${activeTab === "upcoming" ? "active" : ""}`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming
        </button>
        <button 
          className={`tab-btn ${activeTab === "past" ? "active" : ""}`}
          onClick={() => setActiveTab("past")}
        >
          Past
        </button>
      </div>
      
      <div className="tabs-content">
        {activeTab === "pending" && (
          <div className="contest-grid">
            {pendingContests.map(contest => (
              <ContestCard key={contest.id} contest={contest} />
            ))}
          </div>
        )}
        
        {activeTab === "upcoming" && (
          <div className="contest-grid">
            {upcomingContests.map(contest => (
              <ContestCard key={contest.id} contest={contest} />
            ))}
          </div>
        )}
        
        {activeTab === "past" && (
          <div className="contest-grid">
            {pastContests.map(contest => (
              <ContestCard key={contest.id} contest={contest} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestTabs;