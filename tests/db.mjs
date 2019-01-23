import createPrimql from '../';
import createMysql from '../db';
import config from './config';

export const primql = createPrimql(config);

export const mysql = createMysql(config);