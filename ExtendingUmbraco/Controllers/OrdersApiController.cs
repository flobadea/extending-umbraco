using ExtendingUmbraco.OrderManagement.Dtos;
using ExtendingUmbraco.OrderManagement.Entities;
using ExtendingUmbraco.OrderManagement.Repositories;
using System;
using System.Linq;
using System.Net;
using System.Web.Http;
using Umbraco.Web.Mvc;
using Umbraco.Web.WebApi;

namespace ExtendingUmbraco.Controllers
{
    [PluginController("orders")]
    public class OrdersApiController : UmbracoAuthorizedApiController
    {
        private readonly OrdersRepository ordersRepo;
        public OrdersApiController()
        {
            ordersRepo = new OrdersRepository();
        }
        [HttpGet]
        public IHttpActionResult GetPaged(int page = 0, int pageSize = 100)
        {
            if (page < 0) page = 0;
            page++;
            if (pageSize <= 0 || pageSize > 100) pageSize = 100;
            var ordersPage = ordersRepo.GetPaged(page, pageSize,
                      "Status asc, CreatedAt desc");
            var result = new PageDto<OrderDto>();
            result.CurrentPage = ordersPage.CurrentPage - 1;
            result.TotalPages = ordersPage.TotalPages;
            result.Items = ordersPage.Items.Select(p => new OrderDto()
            {
                CreatedAt = p.CreatedAt,
                DeliveredAt = p.DeliveredAt,
                Id = p.Id,
                ShippedAt = p.ShippedAt,
                ShippingAddress = p.ShippingAddress,
                Status = ((OrderStatus)p.Status).ToString(),
                Total = p.Total
            }).ToArray();
            return Ok(result);
        }
        [HttpGet]
        [Route("{id}")]
        public IHttpActionResult ById(int id)
        {
            var order = ordersRepo.GetById(id);
            if (order == null || order.IsDeleted)
            {
                return NotFound();
            }
            var dto = new OrderDto()
            {
                Id = order.Id,
                CreatedAt = order.CreatedAt,
                DeliveredAt = order.DeliveredAt,
                ShippedAt = order.ShippedAt,
                ShippingAddress = order.ShippingAddress,
                Status = ((OrderStatus)order.Status).ToString(),
                Total = order.Total
            };
            return Ok(dto);
        }
        [HttpGet]
        [Route("{id}")]
        public IHttpActionResult GetItems(int id, int page = 0, int pageSize = 100)
        {
            if (page < 0) page = 0;
            page++;
            if (pageSize <= 0 || pageSize > 100) pageSize = 100;
            var order = ordersRepo.GetById(id);
            if (order == null || order.IsDeleted)
            {
                return NotFound();
            }
            var items = ordersRepo.GetOrderItems(id, page, pageSize);
            var dto = new PageDto<OrderItemDto>()
            {
                CurrentPage = items.CurrentPage - 1,
                TotalPages = items.TotalPages,
                Items = items.Items.Select(p => new OrderItemDto()
                {
                    OrderId = p.OrderId,
                    ProductId = p.ProductId,
                    UnitPrice = p.UnitPrice,
                    ProductName = p.Product.Name,
                    Qty = p.Qty
                }).ToArray()
            };
            return Ok(dto);
        }
        [HttpDelete]
        [Route("{id}")]
        public IHttpActionResult Delete(int id)
        {
            var order = ordersRepo.GetById(id);
            if (order == null || order.IsDeleted)
            {
                return NotFound();
            }
            ordersRepo.Delete(id);
            return StatusCode(HttpStatusCode.NoContent);
        }
        [HttpPost]
        public IHttpActionResult Post([FromBody]OrderInsertDto order)
        {
            if (order == null || ModelState.IsValid == false || order.Items.Length == 0)
            {
                return BadRequest();
            }

            var newOrder = new Order()
            {
                CreatedAt = DateTime.Now,
                ShippingAddress = order.ShippingAddress,
                Status = (int)OrderStatus.Created
            };
            var items = order.Items.Select(p => new OrderItem()
            {
                ProductId = p.ProductId,
                Qty = p.Quantity,
                UnitPrice = p.Price
            });
            ordersRepo.Insert(newOrder, items.ToArray());
            return Ok();
        }
        [HttpPut]
        [Route("{id}")]
        public IHttpActionResult Update(int id, [FromBody]OrderUpdateViewModel order)
        {
            if (order == null || id != order.OrderId)
            {
                return BadRequest();
            }
            var statuses = Enum.GetValues(typeof(OrderStatus)).Cast<int>().ToArray();
            if (statuses.Contains(order.Status) == false)
            {
                return BadRequest();
            }
            var existingOrder = ordersRepo.GetById(id);
            if (existingOrder == null || existingOrder.IsDeleted)
            {
                return NotFound();
            }
            if (existingOrder == null || existingOrder.IsDeleted)
            {
                return NotFound();
            }
            if (order.Status == (int)OrderStatus.Shipped)
            {
                existingOrder.Status = (int)OrderStatus.Shipped;
                existingOrder.ShippedAt = DateTime.Now;
                existingOrder.DeliveredAt = null;
            }
            else if (order.Status == (int)OrderStatus.Delivered)
            {
                existingOrder.Status = (int)OrderStatus.Delivered;
                existingOrder.DeliveredAt = DateTime.Now;
            }
            else
            {
                existingOrder.Status = (int)OrderStatus.Created;
                existingOrder.DeliveredAt = null;
                existingOrder.ShippedAt = null;
            }
            ordersRepo.Update(existingOrder);

            return StatusCode(HttpStatusCode.NoContent);

        }

    }

}