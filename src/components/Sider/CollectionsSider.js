import RepositoryDropdown from "../Collections/RepositoryDropdown.";
import CollectionInsights from "../Collections/CollectionInsights";
import ReleasesAndTags from "../Collections/ReleasesAndTags";

export const CollectionSider = ({ repositoryCallback, repository }) => {
  return (
    <>
      <div>
        <RepositoryDropdown repositoryCallback={repositoryCallback} />
      </div>
      <div>
        <CollectionInsights
          owner={repository.owner}
          repository={repository.repo}
        />
      </div>
      <div>
        <ReleasesAndTags
          owner={repository.owner}
          repository={repository.repo}
        />
      </div>
    </>
  );
};
