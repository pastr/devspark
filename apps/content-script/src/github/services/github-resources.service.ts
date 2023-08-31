import { LocationService } from "@devspark/services/location";


export class GithubResourcesService {
  static getOrganization() {
    const url = LocationService.getCurrentURL();
    const [_ignore, organization] = url.pathname.split("/");
    return organization;
  }

  static getRepository() {
    const url = LocationService.getCurrentURL();
    const [_ignore, _organization, repository] = url.pathname.split("/");
    return repository;
  }

  static getIssueId() {
    const url = LocationService.getCurrentURL();
    const [_ignore, _organization, _repository, _ignore2, issueId] = url.pathname.split("/");
    return issueId;
  }
}
