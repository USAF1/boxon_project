using boxon_project.Models;

namespace boxon_project.Interfaces
{
    public interface IArticelService
    {

        public Task<ResponseModel> AddArticle(List<ArticleModel> model);

    }
}
