import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  getPolls,
  createPoll,
  votePoll,
} from "../services/api";

import "../styles/polls.css";

function Polls() {

  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showCreatePoll, setShowCreatePoll] = useState(false);

  const [question, setQuestion] = useState("");

  const [options, setOptions] = useState([
    "",
    "",
  ]);

  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    loadPolls();
  }, []);

  const loadPolls = async () => {

    try {

      const data = await getPolls();

      setPolls(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };


  const handleCreatePoll = async (e) => {

    e.preventDefault();

    const validOptions = options.filter(
      (option) => option.trim() !== ""
    );

    if (!question.trim()) {
      alert("Please enter a question.");
      return;
    }

    if (validOptions.length < 2) {
      alert("Add at least two options.");
      return;
    }

    try {

      await createPoll({
        question,
        options: validOptions,
      });

      setQuestion("");

      setOptions([
        "",
        "",
      ]);

      setShowCreatePoll(false);

      await loadPolls();

    } catch (error) {

      console.error(error);

      alert("Failed to create poll.");

    }
  };


  const handleVote = async (pollId) => {

    const optionId =
      selectedOptions[pollId];

    if (!optionId) {

      alert("Please select an option.");

      return;
    }

    try {

      await votePoll(
        pollId,
        optionId
      );

      await loadPolls();

      alert("Vote submitted!");

    } catch (error) {

      console.error(error);

      alert("Failed to submit vote.");

    }
  };


  const addOption = () => {

    setOptions([
      ...options,
      "",
    ]);

  };


  const updateOption = (index, value) => {

    const updated = [
      ...options,
    ];

    updated[index] = value;

    setOptions(updated);

  };


  const calculatePercentage = (
    option,
    poll
  ) => {

    const totalVotes =
      poll.options.reduce(
        (sum, item) =>
          sum + item.votes,
        0
      );

    if (totalVotes === 0) {
      return 0;
    }

    return Math.round(
      (option.votes / totalVotes) *
        100
    );

  };


  return (
    <div className="dashboard-layout">

      <Sidebar />

      <main className="dashboard-content">

        <Navbar title="Polls & Elections" />

        <div className="polls-header">

          <div>

            <h1>
              🗳️ Student Polls & Elections
            </h1>

            <p>
              Vote anonymously and participate
              in club decisions.
            </p>

          </div>

          <button
            className="vote-btn"
            onClick={() =>
              setShowCreatePoll(
                !showCreatePoll
              )
            }
          >
            + Create Poll
          </button>

        </div>


        {/* CREATE POLL */}

        {showCreatePoll && (

          <div className="poll-card">

            <h2>
              Create a Poll
            </h2>

            <form
              onSubmit={
                handleCreatePoll
              }
            >

              <input
                type="text"
                placeholder="Poll question"
                value={question}
                onChange={(e) =>
                  setQuestion(
                    e.target.value
                  )
                }
              />

              {options.map(
                (option, index) => (

                  <input
                    key={index}
                    type="text"
                    placeholder={`Option ${
                      index + 1
                    }`}
                    value={option}
                    onChange={(e) =>
                      updateOption(
                        index,
                        e.target.value
                      )
                    }
                  />

                )
              )}

              <button
                type="button"
                onClick={addOption}
              >
                + Add Option
              </button>

              <button
                type="submit"
                className="vote-btn"
              >
                Create Poll
              </button>

            </form>

          </div>

        )}


        {/* POLLS */}

        {loading ? (

          <p>Loading polls...</p>

        ) : polls.length === 0 ? (

          <div className="poll-card">

            <h2>
              No polls yet
            </h2>

            <p>
              Create the first poll for
              your campus.
            </p>

          </div>

        ) : (

          polls.map((poll) => (

            <div
              className="poll-card"
              key={poll.id}
            >

              <h2>
                🗳️ {poll.question}
              </h2>


              {/* OPTIONS */}

              {poll.options.map(
                (option) => (

                  <label
                    key={option.id}
                  >

                    <input
                      type="radio"
                      name={`poll-${poll.id}`}
                      value={option.id}
                      checked={
                        selectedOptions[
                          poll.id
                        ] === option.id
                      }
                      onChange={() =>
                        setSelectedOptions({
                          ...selectedOptions,
                          [poll.id]:
                            option.id,
                        })
                      }
                    />

                    {option.option_text}

                  </label>

                )
              )}


              <button
                className="vote-btn"
                onClick={() =>
                  handleVote(
                    poll.id
                  )
                }
              >
                Submit Vote
              </button>


              {/* RESULTS */}

              <h3>
                📊 Results
              </h3>

              {poll.options.map(
                (option) => {

                  const percentage =
                    calculatePercentage(
                      option,
                      poll
                    );

                  return (

                    <div
                      className="result"
                      key={option.id}
                    >

                      <span>
                        {option.option_text}
                      </span>

                      <div className="progress">

                        <div
                          className="fill"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />

                      </div>

                      <span>
                        {percentage}%
                      </span>

                    </div>

                  );

                }
              )}

            </div>

          ))

        )}

      </main>

    </div>
  );
}

export default Polls;


