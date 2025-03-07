export * from './authenticationCode.service';
import { AuthenticationCodeService } from './authenticationCode.service';
export * from './contentModule.service';
import { ContentModuleService } from './contentModule.service';
export * from './organization.service';
import { OrganizationService } from './organization.service';
export const APIS = [AuthenticationCodeService, ContentModuleService, OrganizationService];
