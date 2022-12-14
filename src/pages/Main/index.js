import React, { Component } from "react";
import moment from "moment";
import logo from "../../assets/logo.png";
import api from "../../services/api";
import { Container, Form } from "./styles";

import CompareList from "../../components/CompareList";

export default class Main extends Component {
  // stateless components... importante fazer o import {Component}

  state = {
    localStorage:[],
    loading: false,
    repositoryError: false,
    repositoryInput: "",
    repositories: [],
  };



  handleAddRepository = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });
    try {
      const { data: repository } = await api.get(
        `/repos/${this.state.repositoryInput}`
      );

      repository.lastCommit = moment(repository.pushed_at).fromNow();


      this.setState({
        repositoryInput: "",
        repositories: [...this.state.repositories, repository],
        repositoryError: false,
      });

      localStorage.setItem('repository', JSON.stringify())

    } catch (error) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };


  render() {
    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form
          withError={this.state.repositoryError}
          onSubmit={this.handleAddRepository}
        >
          <input
            type="text"
            placeholder="usuario/repositorio"
            value={this.state.repositoryInput}
            onChange={(e) => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">
            {this.state.loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}
          </button>
        </Form>
        <CompareList repositories={this.state.repositories} />
      </Container>
    );
  }
}
