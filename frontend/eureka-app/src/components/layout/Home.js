import '../../App.css';
import Footer from "./Footer";
const Home = () => {
  return (
    <body>
      <main >
        <div className="container rounded-3 p-xl-5">
          <main class="center">
            <section class="hero">
            <img src="LMS.png" className="card-img-top" style={{height: 450}} alt="..."/>
              <h1>Welcome to the LMS Web-Application!</h1>
              <p>Discover a world of knowledge and enhance your learning experience. </p>
              <p>First of all you should to <b>sign in || create new account</b></p>
              <a href="/auth" class="btns primary">Get Started</a>
            </section>
          </main>
        </div>
      </main>
      <Footer />
    </body>
  );
}

export default Home;