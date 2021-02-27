import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Card,
  CardDeck,
  ListGroup,
  Col,
  Row,
  Container,
  Badge,
  NavDropdown,
  Modal,
  ModalBody,
} from "react-bootstrap";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Footer from "./Footer";
import DownloadBrochures from "./DownloadBrochures";
import { useMediaQuery } from "react-responsive";

function ArticlePage() {
  const { arId } = useParams();
  console.log(arId);
  return (
    <div>
      <h1>Article Page</h1>
    </div>
  );
}

export default ArticlePage;
