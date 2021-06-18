
import Table from "./Table";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import "../App.css";

 const Home = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Table />
        <AmplifySignOut />
      </header>
    </div>
  );
};
export default Home;
