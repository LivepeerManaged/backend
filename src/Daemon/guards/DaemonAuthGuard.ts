import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class DaemonAuthGuard extends AuthGuard('daemon') {}
