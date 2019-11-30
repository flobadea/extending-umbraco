using ExtendingUmbraco.OrderManagement;
using ExtendingUmbraco.OrderManagement.Dtos;
using ExtendingUmbraco.OrderManagement.Entities;
using ExtendingUmbraco.OrderManagement.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using Umbraco.Web.Editors;
using Umbraco.Web.Mvc;

namespace ExtendingUmbraco.Controllers
{
    [PluginController("orders")]
    public class ProductsApiController : UmbracoAuthorizedJsonController
    {
        private readonly ProductsRepository productsRepo;
        private readonly PropertyMappingService mappingService;
        public ProductsApiController()
        {
            productsRepo = new ProductsRepository();
            mappingService = new PropertyMappingService();
        }
        [HttpGet]
        public IHttpActionResult Paged(int page = 0, int pageSize = 100,
            string filter = null, string sortColumn = "id", string sortOrder = "asc")
        {
            if (page < 0) page = 0;
            page++;
            if (pageSize <= 0 || pageSize > 100) page = 100;
            var filterObj = FilterHelper.DeserializeFilter<ProductFilter>(filter);
            if (filterObj == null)
            {
                return BadRequest();
            }
            var mappedColumn = mappingService.GetPropertyMapping<ProductDto, Product>(sortColumn);
            if (mappedColumn == null)
            {
                return BadRequest();
            }
            var productsPage = productsRepo.GetPaged(
         page, pageSize, filterObj, mappedColumn, sortOrder);

            var res = new PageDto<ProductDto>()
            {
                CurrentPage = productsPage.CurrentPage - 1,
                TotalPages = productsPage.TotalPages,
                Items = productsPage.Items
               .Select(p => new ProductDto()
               {
                   Id = p.Id,
                   CategoryId = p.CategoryId,
                   CategoryName = p.Category.Name,
                   Name = p.Name,
                   Price = p.Price,
                   Description = p.Description
               }).ToArray()
            };
            return Ok(res);
        }
        [HttpGet]
        [Route("{id}")]
        public IHttpActionResult ById(int id)
        {
            var res = productsRepo.GetById(id);
            if (res == null)
            {
                return NotFound();
            }
            var dto = new ProductDto()
            {
                Id = res.Id,
                CategoryId = res.CategoryId,
                Description = res.Description,
                Name = res.Name,
                Price = res.Price
            };
            return Ok(dto);
        }
        [HttpPost]
        public IHttpActionResult Post([FromBody]CreateProductDto dto)
        {
            if (dto == null || !ModelState.IsValid)
            {
                return BadRequest();
            }
            var product = new Product()
            {
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
                CategoryId = dto.CategoryId
            };
            var addedProduct = productsRepo.Insert(product);
            var dtoRes = new ProductDto()
            {
                Id = addedProduct.Id,
                Name = addedProduct.Name,
                Description = addedProduct.Description,
                CategoryId = addedProduct.CategoryId,
                Price = addedProduct.Price
            };
            return Created("umbraco/backoffice/orders/productsapi/byid/" + dtoRes.Id,
                         dtoRes);
        }
        [HttpPut]
        [Route("{id}")]
        public IHttpActionResult Put(int id, [FromBody]UpdateProductDto dto)
        {
            if (dto == null || ModelState.IsValid == false || id != dto.Id)
            {
                return BadRequest();
            }
            var existingProduct = productsRepo.GetById(id);
            if (existingProduct == null)
            {
                return NotFound();
            }
            existingProduct.Name = dto.Name;
            existingProduct.Description = dto.Description;
            existingProduct.Price = dto.Price;
            existingProduct.CategoryId = dto.CategoryId;
            productsRepo.Update(existingProduct);
            return StatusCode(HttpStatusCode.NoContent);
        }
        [HttpDelete]
        [Route("{id}")]
        public IHttpActionResult Delete(int id)
        {
            var res = productsRepo.GetById(id);
            if (res == null)
            {
                return NotFound();
            }
            productsRepo.Delete(id);
            return StatusCode(HttpStatusCode.NoContent);
        }

    }

}