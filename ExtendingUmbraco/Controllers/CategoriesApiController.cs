using ExtendingUmbraco.OrderManagement;
using ExtendingUmbraco.OrderManagement.Dtos;
using ExtendingUmbraco.OrderManagement.Entities;
using ExtendingUmbraco.OrderManagement.Repositories;
using System.Linq;
using System.Net;
using System.Web.Http;
using Umbraco.Web.Editors;
using Umbraco.Web.Mvc;

namespace ExtendingUmbraco.Controllers
{
    [PluginController("orders")]
    public class CategoriesApiController : UmbracoAuthorizedJsonController
    {
        private readonly CategoriesRepository repo;
        private readonly PropertyMappingService mappingService;
        public CategoriesApiController()
        {
            repo = new CategoriesRepository();
            mappingService = new PropertyMappingService();
        }
        [HttpGet]
        public IHttpActionResult All(int page = 0, int pageSize = 100,
           string filter = null, string sortColumn = "id", string sortOrder = "asc")
        {
            if (page < 0) page = 0;
            page++;
            if (page <= 0 || pageSize > 100) page = 100;

            var filterObj = FilterHelper.DeserializeFilter<CategoryFilter>(filter);
            if (filterObj == null)
            {
                return BadRequest();
            }
            var mappedColumn = mappingService
      .GetPropertyMapping<CategoryDto, Category>(sortColumn);
            if (mappedColumn == null)
            {
                return BadRequest();
            }
            var res = repo.GetPaged(page, pageSize, filterObj, mappedColumn, sortOrder);
            var dto = new PageDto<CategoryDto>()
            {
                CurrentPage = res.CurrentPage - 1,
                TotalPages = res.TotalPages,
                Items = res.Items.Select(p => new CategoryDto()
                {
                    Id = p.Id,
                    Name = p.Name
                }).ToArray()
            };
            return Ok(dto);
        }
        [HttpPost]
        public IHttpActionResult Post([FromBody]CreateCategoryDto dto)
        {
            if (dto == null || !ModelState.IsValid)
            {
                return BadRequest();
            }
            var category = new Category() { Name = dto.Name };
            var addedCategory = repo.Insert(category);
            var dtoRes = new CategoryDto()
            {
                Id = addedCategory.Id,
                Name = addedCategory.Name
            };
            return Created("umbraco/backoffice/orders/categoriesapi/byid/" + dtoRes.Id,
             dtoRes);
        }
        [HttpGet]
        [Route("{id}")]
        public IHttpActionResult ById(int id)
        {
            var category = repo.GetById(id);
            if (category == null)
            {
                return NotFound();
            }
            var dto = new CategoryDto()
            {
                Id = category.Id,
                Name = category.Name
            };
            return Ok(dto);
        }
        [HttpDelete]
        [Route("{id}")]
        public IHttpActionResult Delete(int id)
        {
            var res = repo.GetById(id);
            if (res == null)
            {
                return NotFound();
            }
            repo.Delete(id);
            return StatusCode(HttpStatusCode.NoContent);
        }
        [HttpPut]
        [Route("{id}")]
        public IHttpActionResult Put(int id, [FromBody]UpdateCategoryDto dto)
        {
            if (dto == null || ModelState.IsValid == false || id != dto.Id)
            {
                return BadRequest();
            }
            var existingCategory = repo.GetById(id);
            if (existingCategory == null)
            {
                return NotFound();
            }
            existingCategory.Name = dto.Name;
            repo.Update(existingCategory);
            return StatusCode(HttpStatusCode.NoContent);
        }

    }

}