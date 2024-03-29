import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import MoreInfo from "./components/MoreInfo/MoreInfo";
import Ingredients from "./components/Ingredients/Ingredients";
import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import { random } from "./utils/random";
import { act } from "@testing-library/react";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getter = async () => {
    try {
      setData([]);
      let newData = await random();
      act(() => {
        setData(newData[0]);
        setLoading(false);
      })
    } catch(e) {
      return null
    }
  };
  useEffect(() => {
    getter();
  }, []);

  return (
    <Router>
      <div>
        <Link style={{ textDecoration: "none", color: "black" }} to="/">
          <h1 id="header">brew brew</h1>
        </Link>
      </div>
      {loading ? (
        <div id="loading">
          <p>loading...</p>
        </div>
      ) : (
        <>
          <Switch>
            <Route path="/moreinfo">
              <MoreInfo
                name={data.name}
                tagline={data.tagline}
                first_brew={data.first_brewed}
                img_url={data.image_url}
                tips={data.brewers_tips}
                pairing={data.food_pairing}
              />
            </Route>
            <Route path="/ingredients">
              <Ingredients ingredients={data.ingredients} />
            </Route>
            <Route path="/">
              <Home getter={getter} data={data} />
            </Route>
          </Switch>
        </>
      )}
      <Nav />
    </Router>
  );
};

export default App;
