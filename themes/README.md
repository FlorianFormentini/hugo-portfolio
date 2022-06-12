# Custom Toha Theme

- **[Toha v3.5.0](https://github.com/hugo-toha/toha/tree/v3.5.0)** : A [Hugo](https://gohugo.io/) theme for a personal portfolio with minimalist design and responsiveness.
  - [Documentation](https://toha-guides.netlify.app/posts)

## Changes made

### **Global Style**

Navbar: 
- 'blog' folder insead of 'posts' for content pages and use the `blog/_index.md` 'title' param as link if it exist
  - `themes\toha\layouts\partials\navigators\navbar.html`
    ```html
    {{ if $blogEnabled }}
        <li class="nav-item">
            <a class="nav-link" id="blog-link" href="{{ "/blog" | relLangURL }}">
                {{ with .Site.GetPage "/blog" }}
                    {{ if (isset .Params "title") }}
                        {{ .Title }}
                    {{ else }}
                            {{ i18n "posts" }}
                    {{ end }}
                {{ end }}
            </a>
        </li>
    {{ end }}
    ```

- navbar: modified css to remove gap

- Cards content not justified
  - `themes\toha\static\css\layouts\main.css`
    ```css
    /* .card-body {
    text-align: justify;
    } */
    ```
---

### **Index sections**

#### Experiences

- Reverse experiences list number
  - `layouts\partials\sections\experiences.html`
    ```html
    {{ partial "sections/experiences/vertical-line.html" (sub $totalExperiences $index) }}
    ```
  - `layouts\partials\sections\experiences\vertical-line.html`
    ```html
    <div class="circle font-weight-bold">{{ . }}</div>
    ```


#### Education

- display "name" as title above "institution"
  - `layouts\partials\sections\education.html`
    ```html
    <div class="row">
      <div class="col-lg-10 col-md-8">
        {{ if .institution.url }}
        <h5>
          <a
            href="{{ .institution.url }}"
            title="{{ .institution.name }} - {{ .name }}"
            target="_blank"
            rel="noopener"
          >
            {{ .name }}
          </a>
        </h5>
        {{ else }}
        <h5>{{ .name }}</h5>
        {{ end }}
      </div>
      <div class="timeframe col-lg-2 col-md-4">{{ .timeframe }}</div>
    </div>
    <h6>{{ .institution.name }}</h6>
    ```

- add text section with 'infos' key in the data files
  - `layouts\partials\sections\education.html`
    ```html
    {{ if .infos }}
        <div>
            <p>{{ .infos | markdownify }}</p>
        </div>
    {{ end }}
    ```

- add button to link diploma ?

#### Accomplishments

- Gap due to unitized card sub-title: div "sub-title" removed
  - `layouts\partials\cards\accomplishments.html`

#### Recent posts

- Change link to 'blog' folder
  - `layouts\partials\sections\recent-posts.html`
    ```html
    {{ range first $numShow (where site.RegularPages.ByDate.Reverse "Type" "in" "blog" )}}
        {{ partial "cards/recent-post.html" . }}
    {{ end }}
    ```

---

### **Blog**
- Langage selection: make french the default langage
  - `layouts\partials\navigators\lang-selector-2.html`
    ```html
    <a 
        class="dropdown-item nav-link languages-item"
        href="{{ path.Join "/" (cond (eq .Language.Lang "fr") "" .Language.Lang) $pageURL }}"
    >
        {{ $countryCode := partial "helpers/country-code.html" . }}
        <span class="flag-icon flag-icon-{{$countryCode}}"></span>
        {{ .Language.LanguageName }}
    </a>
    ```

- Sidebar header : using the param 'title' in `/posts/_index.md` if it exists.
  - `layouts/_default/list.html` et `layouts/_default/single.html`
    ```html
    <li id="list-heading">
        <a href="{{ .Type | relLangURL }}" data-filter="all">
            {{ with .Site.GetPage "/blog" }}
                {{ if (isset .Params "title") }}
                    {{ .Title }}
                {{ else }}
                    {{ i18n "posts" }}
                {{ end }}
            {{ end }}
        </a>
    </li>
    ```

- Buttons at the end of the posts
  - `layouts\partials\navigators\next-prev-navigator.html`
    ```html
    <div class="col text-center">
        <a href="{{ .Parent.RelPermalink }}" class="btn btn-outline-info">
            <span>{{ .Parent.Title }}</span>
        </a>
        <a href="{{ site.BaseURL | relLangURL }}" class="btn btn-outline-info">
            <span>
                {{ i18n "home" }} <i class="fa fa-home"></i>
            </span>
        </a>
    </div>
    ```

- [WIP] Navbar: display links 
  - `layouts\partials\navigators\navbar-2.html`
    ```html
    <li class="nav-item">
        <a class="nav-link smooth-scroll" href="{{ site.BaseURL | relLangURL }}">{{ i18n "home" }}</a>
    </li>
    <div class="dropdown-divider" id="top-navbar-divider"></div>
    <li class="nav-item">
        <a class="nav-link active" id="blog-link" href="/blog" target="_self">{{ .Title }}</a>
    </li>
    ```
