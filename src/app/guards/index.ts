// import component from ''
import { LoginGuard } from './login.guard';
import { LoggedGuard } from './logged.guard';
import { SopGuard } from './sop.guard';
import { MdsGuard } from './mds.guard';
import { EditGuard } from './edit.guard';

export const guards: any[] = [
  LoginGuard,
  LoggedGuard,
  SopGuard,
  MdsGuard,
  EditGuard
];

// export * from ''
export * from './login.guard';
export * from './logged.guard';
export * from './edit.guard';
export * from './sop.guard';
export * from './mds.guard';
