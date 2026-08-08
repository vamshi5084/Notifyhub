export default function Queries() {
  return (
    <main>
      <h1>Submit a Query</h1>

      <p>
        Have a question or concern? Submit your query to the campus
        administration.
      </p>

      <form>
        <div>
          <label htmlFor="name">Name</label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
          />
        </div>

        <br />

        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
          />
        </div>

        <br />

        <div>
          <label htmlFor="subject">Subject</label>
          <br />
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Enter query subject"
          />
        </div>

        <br />

        <div>
          <label htmlFor="message">Query</label>
          <br />
          <textarea
            id="message"
            name="message"
            rows={6}
            placeholder="Enter your query"
          />
        </div>

        <br />

        <button type="submit">Submit Query</button>
      </form>
    </main>
  );
}