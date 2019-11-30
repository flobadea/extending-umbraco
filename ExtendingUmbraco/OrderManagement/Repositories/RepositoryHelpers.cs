using Umbraco.Core.Persistence;

namespace ExtendingUmbraco.OrderManagement.Repositories
{
    public static class RepositoryHelpers
    {
        public static void ApplyOrdering(Sql query, string sortColumn, string sortOrder)
        {
            if (!string.IsNullOrEmpty(sortColumn) && !string.IsNullOrEmpty(sortOrder))
            {
                query.OrderBy(sortColumn + " " + sortOrder);
            }
            else
            {
                query.OrderBy("Id asc");
            }
        }
    }

}