import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Form, Jumbotron, Modal } from "react-bootstrap";
import { navigate, A } from "hookrouter";

function AtualizarTarefa(props) {
  const [exibirModal, setExibirModal] = useState(false);
  const [formValidado, setFormValidado] = useState(false);
  const [tarefa, setTarefa] = useState("");
  const [carregarTarefa, setCarregarTarefa] = useState(true);

  function voltar(event) {
    event.preventDefault();
    navigate("/");
  }

  function handleFecharModal() {
    navigate("/");
  }

  function atualizar(event) {
    event.preventDefault();
    setFormValidado(true);

    if (event.target.checkValidity() === true) {
      const tarefasDb = localStorage["tarefas"];
      let tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];

      tarefas = tarefas.map((tarefaObject) => {
        if (tarefaObject.id === parseInt(props.id)) {
          tarefaObject.nome = tarefa;
        }

        return tarefaObject;
      });

      localStorage["tarefas"] = JSON.stringify(tarefas);
      setExibirModal(true);
    }
  }

  function handleTxtTarefa(event) {
    setTarefa(event.target.value);
  }

  useEffect(() => {
    if (carregarTarefa) {
      const tarefasDb = localStorage["tarefas"];
      const tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];
      const tarefa = tarefas.filter((t) => t.id === parseInt(props.id))[0];

      setTarefa(tarefa.nome);

      setCarregarTarefa(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carregarTarefa]);

  return (
    <div>
      <h3 className="text-center">Atualizar</h3>
      <Jumbotron>
        <Form onSubmit={atualizar} noValidate validated={formValidado}>
          <Form.Group>
            <Form.Label>Tarefa</Form.Label>

            <Form.Control
              type="text"
              placeholder="Digite a tarefa"
              minLength="5"
              maxLength="100"
              required
              data-testid="txt-tarefa"
              value={tarefa}
              onChange={handleTxtTarefa}
            />

            <Form.Control.Feedback type="invalid">
              A tarefa deve conter ao menos 5 caracteres
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="text-center">
            <Button variant="success" type="submit" data-testid="btn-atualizar">
              Atualizar
            </Button>
            &nbsp;
            <A href="/" className="btn btn-light" onClick={voltar}>
              Voltar
            </A>
          </Form.Group>
        </Form>

        <Modal
          show={exibirModal}
          onHide={handleFecharModal}
          data-testid="modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Sucesso</Modal.Title>
          </Modal.Header>

          <Modal.Body>Tarefa Atualizada com Sucesso</Modal.Body>

          <Modal.Footer>
            <Button variant="success" onClick={handleFecharModal}>
              Continuar
            </Button>
          </Modal.Footer>
        </Modal>
      </Jumbotron>
    </div>
  );
}

AtualizarTarefa.propTypes = {
  id: PropTypes.number.isRequired,
};

export default AtualizarTarefa;
