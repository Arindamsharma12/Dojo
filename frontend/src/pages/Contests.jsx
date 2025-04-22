import { useEffect, useState } from "react";
import ContestTabs from "../components/ContestTabs";

const Contests = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchContests = async () => {
      try {
        // Mock data
        const mockContests = [
          {
            id: 1,
            title: "Weekly Contest 1",
            description: "Test your skills with these challenges",
            startTime: "2023-06-15T10:00:00",
            endTime: "2023-06-15T12:00:00",
            status: "pending",
            participants: 150
          },
          // More contests...
        ];
        setContests(mockContests);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching contests:", error);
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  if (loading) return <div>Loading contests...</div>;

  return (
    <div className="contests-page">
      <h1>Contests</h1>
      <ContestTabs contests={contests} />
    </div>
  );
};

export default Contests;