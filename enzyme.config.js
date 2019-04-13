/** Used in jest.config.js */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

window.React = React;
window.ReactDom = ReactDOM;
window.styled = styled;

configure({ adapter: new Adapter() }); 