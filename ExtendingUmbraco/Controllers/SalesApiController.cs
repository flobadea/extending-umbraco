using ExtendingUmbraco.OrderManagement.Repositories;
using System.Web.Http;
using Umbraco.Web.Editors;
using Umbraco.Web.Mvc;

namespace ExtendingUmbraco.Controllers
{
    [PluginController("orders")]
    public class SalesApiController : UmbracoAuthorizedJsonController
    {
        private readonly SalesRepository salesRepo;
        public SalesApiController()
        {
            salesRepo = new SalesRepository();
        }
        [HttpGet]
        public IHttpActionResult Top5()
        {
            return Ok(salesRepo.GetTop5Products());
        }
        [HttpGet]
        public IHttpActionResult DailySales()
        {
            return Ok(salesRepo.GetDailySales());
        }
    }

}