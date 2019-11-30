using Newtonsoft.Json;

namespace ExtendingUmbraco.OrderManagement.Dtos
{
    public class PageDto<T>
    {
        [JsonProperty("currentPage")]
        public long CurrentPage { get; set; }
        [JsonProperty("totalPages")]
        public long TotalPages { get; set; }
        [JsonProperty("items")]
        public T[] Items { get; set; }
    }

}