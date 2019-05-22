// import component from ''
import { LoginGuard } from './login.guard';
import { LoggedGuard } from './logged.guard';
import { SopGuard } from './sop.guard';
import { MdsGuard } from './mds.guard';
import { EditGuard } from './edit.guard';
import { LoadSopGuard } from './load-sop.guard';
import { CatalogGuard } from './catalog.guard';

export const guards: any[] = [
  LoginGuard,
  LoggedGuard,
  SopGuard,
  LoadSopGuard,
  MdsGuard,
  EditGuard,
  CatalogGuard
];

// export * from ''
export * from './login.guard';
export * from './logged.guard';
export * from './edit.guard';
export * from './sop.guard';
export * from './load-sop.guard';
export * from './mds.guard';
export * from './catalog.guard';
