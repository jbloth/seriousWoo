import Link from 'next/link';
import Router from 'next/router';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { useContext, useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { AppContext } from '../components/context/AppContext';
import { colors, fonts, breakPoints } from '../styles/theme';
import auth from '../lib/auth';
import GET_CATEGORY_KEYS from '../queries/get-category-keys';
import CartModal from './CartModal';
import SearchModal from './SearchModal';
import MobileMenu from './MobileMenu';
import SearchIcon from './graphics/SearchIcon.js';
import DropdownMenu from './DropdownMenu';

const Logo = (props) => (
  <svg
    role="img"
    viewBox="0 0 565 196"
    fillRule="evenodd"
    clipRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={2}
    aria-labelledby="logoTitle"
    {...props}
  >
    <title id="logoTitle">Serious Salmon Logo</title>
    <g opacity={0.87} fill="#d5b6e4">
      <path d="M84.34 13.649C77.429 7.93 64.946 2.594 53.336 6.064 38.657 10.452 27.384 19.817 26.14 40.829c-.5 8.442 2.582 16.565 7.819 24.11 5.943 8.562 14.844 16.428 21.257 23.488 9.163 10.086 17.803 25.003 15.988 37.611-1.492 10.375-10.185 18.518-21.322 18.425-13.244-.11-24.421-17.52-27.426-29.483-1.413-5.627-4.48-3.668-9.953-2.199-5.474 1.469-10.751 3.671-9.338 9.297 5.184 20.639 23.645 43.267 46.493 43.457 21.924.185 38.872-16.045 41.81-36.468 2.618-18.193-8.046-40.497-21.267-55.051-5.007-5.511-11.691-11.488-16.996-17.975-3.618-4.423-6.921-8.89-6.619-13.989.565-9.549 5.745-13.758 12.415-15.753 5.169-1.544 11.389 1.99 14.466 4.537 4.4 3.64 7.591-.364 10.136-5.565 3.487-7.129 5.137-7.982.737-11.622zM559.717 24.067c-1.878-4.218-9.212-11.621-15.204-14.267-7.836-3.459-17.857-4.574-25.342-1.943-14.197 4.991-26.438 16.054-26.653 36.964-.089 8.592 3.191 16.076 8.417 22.812 5.899 7.606 14.6 14.178 21.336 20.99 9.784 9.893 19.478 16.042 19.74 31.528.112 6.671-3.508 13.246-8.138 17.761-2.66 2.593-5.645 4.611-8.646 5.006-13.198 1.736-20.103-.345-25.836-6.758-3.776-4.222-6.808-1.004-11.016 2.784s-8.006 6.72-4.23 10.942c9.822 10.986 21.134 16.386 43.745 13.412 6.875-.906 14.167-4.706 20.259-10.647 8.494-8.283 14.549-20.611 14.342-32.848-.369-21.806-11.904-31.729-25.681-45.659-5.304-5.364-11.953-10.512-17.244-16.242-3.524-3.817-6.619-7.782-6.566-12.868.104-10.091 6.092-15.37 12.943-17.778 3.066-1.078 8.348-1.024 11.521.474 3.23 1.526 5.53 4.519 7.322 7.39 1.771 2.836 5.782 2.132 10.178-1.361 4.432-3.521 7.607-3.284 4.753-9.692zM118.835 82.662c-.201 14.451-1.313 44.499-1.425 62.351 5.424-.094 12.341-.101 16.879-.088 11.781.035 20.8.091 25.344.144 10.165.117 12.059-.39 11.988 8.706-.076 9.631 2.209 11.656-5.311 11.637-5.575-.015-15.079.305-30.85.046-8.672-.142-28.425.296-28.425.296-2.72-.01-6.738.872-8.653-1.073-1.914-1.946-1.425-8.688-1.408-11.427 0 0 .302-61.935.576-79.696.273-17.644.071-24.984-.182-56.904-.036-4.626-.154-6.7 1.719-8.76 1.482-1.629 5.944-1.742 8.717-1.688 0 0 9.588.029 22.598-.129 12.654-.154 28.239.281 28.239.281 5.549-1.083 4.203 3.763 4.64 10.301.379 5.678.986 9.697-4.068 9.632-10.022-.131-13.57.615-25.877.556-4.706-.022-10.63.325-14.623.413.077 7.185.194 25.467.22 34.873 5.525.176 18.03-.148 24.57-.062 5.652.073 7.711-.264 7.626 9.812-.066 8.043-.18 11.184-6.211 11.034-7.943-.197-18.994-.111-26.083-.255zM207.655 83.131c-1.179.018-6.063.186-7.622.192.57 34.554.463 62.271.496 76.845.014 6.022-4.005 4.563-9.21 4.711-7.824.223-10.2 1.474-10.298-4.178 0 0-2.482-135.874-3.012-148.687-.278-6.712 11.307-5.479 16.909-5.691 8.543-.324 22.476.227 33.746 4.403 11.317 4.193 22.261 13.336 22.867 30.387.987 27.769-12.394 37.244-24.477 39.842 2.096 5.516 4.009 9.84 7.695 17.724 4.38 9.364 29.407 59.88 29.407 59.88 2.908 4.847-1.529 5.908-7.689 5.784-5.651-.114-9.376 2.175-12.285-2.672 0 0-21.624-41.637-25.33-51.071-3.875-9.867-7.691-21.843-11.197-27.469zm6.752-21.433c9.128-1.593 17.905-2.997 17.139-19.012-.385-8.073-9.141-13.686-15.694-14.31-6.743-.642-12.332-.697-17.903.747 0 0 .202 13.972.289 19.81l.274 12.933c1.78-.165 10.379.795 15.895-.168zM272.095 10.236s-.909 48.757-1.328 66.719c-.423 18.088-1.318 72.271-1.115 83.126.108 5.727 3.795 4.059 9.435 4.456 7.659.538 10.338-.287 10.231-6.015-.202-10.726 1.186-56.891 1.604-74.768.419-18.002 2.095-73.87 2.095-73.87.093-5.728-5.472-5.144-10.436-5.437-5.642-.332-10.395.061-10.486 5.789zM350.038 5.248c25.037-1.633 44.271 21.165 44.554 80.646.067 14.021-5.28 37.453-13.305 53.816-6.514 13.282-16.256 22.77-28.975 24.724-13.532 2.079-24.757-4.618-33.003-17.512-9.555-14.937-14.935-39.192-15.907-62.11-2.141-50.456 24.187-78.101 46.636-79.564zm1.79 22.832c-17.779-.08-28.027 41.841-27.961 55.77.09 18.916 4.66 39.055 12.539 51.373 3.382 5.289 7.388 9.128 12.94 8.274 6.361-.977 10.416-6.68 13.674-13.323 6.628-13.512 9.733-26.14 9.753-44.712.037-34.483-7.409-57.322-20.945-57.382zM403.442 11.485s-1.402 35.332-1.059 54.41c.252 14.008-1.731 54.666 8.813 77.62 6.13 13.341 15.992 21.578 30.286 21.325 16.947-.302 27.92-12.555 33.812-30.028 6.894-20.444 6.831-48.081 7.153-59.393.531-18.645-.53-64.877-.53-64.877-.17-5.65-4.958-5.771-9.983-5.192-5.616.646-10.786-.897-10.616 4.753 0 0 1.175 46.438.654 64.734-.288 10.168.11 35.053-6.087 53.431-2.845 8.438-6.582 15.946-14.766 16.091-4.164.074-7.032-2.245-9.214-5.561-2.237-3.397-3.826-7.682-5.066-12.387-5.576-21.159-3.779-49.957-3.977-60.884-.338-18.806.667-54.54.667-54.54.08-5.651-4.979-5.874-10.76-5.722-7.02.186-9.247.568-9.327 6.22z" />
    </g>
    <g fill="#df6738">
      <path d="M65.026 154.272c1.594-6.576 7.128-27.187 10.393-39.726 1.347-5.178-.011-5.949-3.566-7.065-3.941-1.239-5.042-.765-6.757 3.906-4.036 10.988-9.202 27.084-11.726 34.057-2.328 6.436-6.921 21.054-10.521 32.06-1.739 5.316 1.711 6.201 5.389 7.076 5.806 1.382 8.696 2.106 9.903-2.506 2.639-10.081 5.607-22.538 6.885-27.802zM508.607 109.877c-1.091 6.486-5.04 26.851-7.342 39.234-.95 5.115.463 5.775 4.089 6.63 4.02.947 5.081.416 6.435-4.228 3.187-10.928 7.114-26.887 9.099-33.819 1.831-6.398 5.299-20.885 8.05-31.801 1.33-5.273-2.175-5.91-5.905-6.522-5.89-.967-8.823-1.483-9.677 3.072-1.864 9.957-3.877 22.241-4.749 27.434zM503.879 168.419c3.86.969 6.143 5.394 5.096 9.874-1.047 4.48-5.031 7.33-8.89 6.361-3.861-.969-6.144-5.395-5.097-9.875 1.048-4.48 5.031-7.33 8.891-6.36zM80.556 83.473c3.78 1.234 5.799 5.455 4.505 9.423-1.293 3.968-5.414 6.187-9.194 4.954-3.781-1.233-5.8-5.455-4.506-9.422 1.294-3.968 5.414-6.188 9.195-4.955z" />
    </g>
    <g fill="#df6738">
      <path d="M159.712 105.571a2.004 2.004 0 002.444-1.019c1.945-4.32 1.593-9.223.059-13.338-2.393-6.414-8.119-12.433-17.223-13.361-15.523-1.582-24.472 8.6-25.891 20.407-1.893 15.738 3.948 21.653 13.393 32.853 5.455 6.469 10.497 18.075 7.271 29.639-3.935 14.094-19.351 17.843-30.841 12.331-10.42-5-13.613-17.444-8.721-33.371a1.938 1.938 0 00-1.401-2.457c-3.086-.737-5.792-1.315-9.091-2.002a1.967 1.967 0 00-2.292 1.378c-5.81 20.441.109 40.062 16.093 47.731 18.118 8.694 42.1 1.979 48.302-20.247 4.464-15.995-2.211-32.12-9.757-41.068-6.806-8.07-11.899-11.953-10.535-23.293.664-5.529 4.933-10.196 12.203-9.455 3.587.366 6.092 2.846 7.11 5.343.519 1.273.266 3.337-.329 5.047a1.605 1.605 0 00.992 2.09c2.467.866 6.032 2.057 8.214 2.792zM213.936 156.298c-2.307 6.65-2.424 10.733-.461 13.24 1.802 2.301 5.15 3.047 7.657 2.743 2.758-.334 7.025-3.28 9.729-6.406a.887.887 0 00.185-.789 34.715 34.715 0 01-.737-3.654c-2.088-14.22 1.191-32.892 4.706-43.012 5.534-15.931 15.194-29.007 22.914-34.243 5.359-3.635 10.387-3.954 14.019-2.154 3.086 1.529 5.843 5.214 6.633 11.292 1.101 8.483-1.275 23.341-7.376 39.464-5.129 13.556-15.238 26.913-25.072 36.575.951 1.211 2.154 2.093 3.738 2.436 7.703 1.669 17.241-4.686 23.014-20.434 1.204-3.279 4.827-13.681 6.327-16.722 2.986-7.728 6.781-18.432 8.122-22.132a.904.904 0 011.046-.571c1.011.224 1.883.432 3.445.749 1.244.252 2.199.518 3.026.732.524.13 1.079.044 1.539-.238 3.899-2.364 8.139-3.464 12.564-2.805 5.086.757 8.429 2.94 10.497 6.006a.708.708 0 001.062.145c.301-.256.601-.508.902-.751 5.785-4.688 12.157-6.455 17.846-4.92 4.107 1.107 6.893 3.147 8.769 5.753 1.8 2.502 2.791 5.638 2.883 9.423.129 5.288-1.675 12.295-4.5 20.518-1.913 5.567-4.822 13.075-7.464 20.467-.847 2.37.226 5.08 2.563 5.337 2.205.241 4.59-1.161 7.238-4.147a1.865 1.865 0 00.439-1.621 3.918 3.918 0 00-.056-.321c-1.719-8.76.4-19.935 4.468-28.894 2.863-6.306 6.932-11.081 10.7-14.073.345-.268.617-.616.796-1.013.223-.492.473-.979.751-1.46 4.975-8.614 17.265-12.63 27.086-10.366 5.873 1.353 9.9 4.531 12.433 8.879a1.196 1.196 0 001.832.31c2.135-1.865 4.195-3.452 6.17-4.524 3.29-1.785 6.518-2.366 9.623-1.712 4.289.904 6.067 2.387 7.493 3.725.466.435 1.199 1.362 1.656 1.979a.553.553 0 00.845.077c.62-.612 1.677-1.644 2.316-2.187 5.457-4.634 13.173-8.759 21.752-6.491 6.811 1.8 10.466 6.427 11.634 12.933 1.24 6.902-.99 16.717-5.259 26.623-3.434 7.971-6.327 14.005-7.989 18.87-1.07 3.129-1.804 5.463-.884 7.564 1.195 2.727 3.036 4.347 5.13 3.898 2.735-.587 4.549-3.262 6.797-10.752a.931.931 0 011.035-.645c2.507.363 8.522 1.176 10.846 1.629.42.109.688.52.621.949-2.09 13.28-10.324 19.69-16.677 21.052-7.214 1.545-15.098-1.719-19.212-11.112-1.689-3.856-1.853-8.105-.495-13.33 1.468-5.651 4.953-12.893 9.34-23.074 2.702-6.272 4.627-12.428 4.606-17.351-.009-2.445-.419-4.559-2.69-5.159-4.431-1.171-8.412 1.935-11.909 5.322-6.965 6.744-9.723 11.186-12.123 16.97-1.183 2.851-2.342 5.705-3.517 8.563-5.612 13.651-5.537 13.98-10.983 27.105a1.212 1.212 0 01-1.072.79c-1.342.087-3.441.166-5.285.111-2.765-.082-4.656.031-6.495-.075a.805.805 0 01-.688-1.117c6.52-15.479 7.463-18.011 12.952-31.571 2.716-6.708 6.351-13.426 7.034-18.929.402-3.238-2.895-3.656-4.694-2.111-2.411 2.071-5.086 4.641-7.869 7.278-.289.274-.46.65-.477 1.047-.411 8.79-3.224 18.285-6.228 24.692-2.471 5.267-7.402 12.611-14.054 17.619-7.461 5.616-16.901 8.423-27.495 3.764a19.572 19.572 0 01-4.114-2.432 1.617 1.617 0 00-2.034.028c-5.281 4.414-10.475 5.585-14.658 5.126-10.08-1.106-16.632-11.763-12.979-21.983 2.622-7.339 5.513-14.795 7.412-20.322 1.847-5.375 3.286-10.084 3.715-13.969.213-1.92-.061-4.997-2.291-5.581-2.212-.581-4.469.741-6.713 2.56-3.29 2.666-7.12 7.136-9.227 13.781-4.321 13.622-11.897 33.373-15.489 41.361a1.063 1.063 0 01-.868.619c-2.468.153-8.519.14-11.883.099a.722.722 0 01-.652-1.015c3.102-7.245 11.42-29.036 14.303-36.742 1.331-3.563 2.731-8.092 3.443-10.879.487-1.907.823-3.963.827-5.844.002-1.315-.824-3.778-2.633-4.125-3.723-.715-7.122 2.263-9.819 5.498-3.004 3.603-4.428 6.241-6.609 11.368-1.96 4.606-3.975 10.384-6.053 16.054-8.805 24.018-25.662 30.899-37.409 28.354-4.308-.933-8.124-3.679-10.496-6.465-5.168 3.929-11.099 7.459-16.318 7.25-5.805-.233-12.638-2.258-16.783-7.55a17.208 17.208 0 01-1.272-1.867.53.53 0 00-.385-.258.53.53 0 00-.438.145c-8.711 8.444-19.034 10.942-28.784 7.311-7.284-2.712-11.452-8.319-13.208-15.457-2.139-8.704-.316-20.033 3.261-29.598 3.573-9.554 11.369-18.607 20.059-23.321 6.588-3.574 13.671-4.691 20.075-2.556 4.707 1.569 8.081 4.116 10.481 7.087a.629.629 0 001.036-.071c.248-.416.541-.913.752-1.273a.668.668 0 01.816-.285c2.698 1.06 6.9 2.988 10.016 4.523a.85.85 0 01.412 1.077c-5.572 13.939-9.303 24.345-12.511 33.589zm153.879-16.984a.72.72 0 00-1.17.085 29.647 29.647 0 00-1.653 3.137c-2.547 5.61-4.219 12.351-3.939 18.257.204 4.281 1.287 8.211 4.937 9.817 5.769 2.537 10.873.75 14.935-2.308 4.871-3.667 8.442-9.078 10.251-12.935 1.154-2.461 2.31-5.5 3.232-8.768a.641.641 0 00-.848-.766c-4.917 1.875-10.193 2.256-15.83.114-4.407-1.674-7.663-4.022-9.915-6.633zm-164.963 10.879c1.282-3.168 2.579-6.567 3.187-9.637.639-3.23.8-5.029-.022-8.73-.702-3.159-2.456-6.779-7.038-8.306-3.257-1.086-6.803-.134-10.153 1.683-6.214 3.372-11.753 9.876-14.308 16.707-2.288 6.119-3.84 13.15-3.315 19.196.378 4.355 1.816 8.229 5.911 9.754 4.486 1.671 9.007.727 13.118-2.281 4.66-3.409 7.163-6.558 10.43-13.427a82.41 82.41 0 002.19-4.959zm63.264-54.93a.794.794 0 00-1.204-.552c-.786.496-1.64 1.092-2.32 1.714-5.702 5.223-11.859 14.875-15.759 26.101-2.505 7.209-4.929 19.445-4.679 30.397a.98.98 0 001.72.609c6.379-7.421 12.249-16.243 15.631-25.181 4.506-11.908 6.881-22.969 6.845-30.494-.005-.837-.105-1.759-.234-2.594zm129.022 35.42c.543-.421.79-1.119.631-1.786-.719-3.012-2.298-5.483-5.644-6.254-3.07-.707-6.905-.212-9.837 1.207-1.526.738-4.321 3.603-4.041 5.324.28 1.721 2.548 3.795 5.926 5.078 3.559 1.353 6.751.376 9.701-1.347a30.926 30.926 0 003.264-2.222z" />
    </g>
  </svg>
);

const CartIcon = (props) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 50 50"
    fillRule="evenodd"
    clipRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={2}
    {...props}
  >
    <path d="M12.23 40.576a.32.32 0 00-.256-.511c-.883-.003-2.327-.002-2.327-.002-.893 0-1.646-.7-1.757-1.633L4.164 7.02a.718.718 0 00-.712-.633H1.515C.538 6.387.41 5.419.377 3.638.345 1.878.538.553 1.515.553h6.137c.894 0 1.647.7 1.758 1.633l.978 8.248a1.209 1.209 0 001.201 1.066h35.399a1.265 1.265 0 011.216 1.605l-4.659 16.606a1.255 1.255 0 01-1.208.916H13.37a.52.52 0 00-.517.582l.303 2.561a.521.521 0 00.518.459l28.263.009c.977 0 .437 3.2.114 4.233-.408 1.303-.443 1.575-1.42 1.575l-2.565.001a.324.324 0 00-.257.516 5.667 5.667 0 011.078 3.335 5.72 5.72 0 01-5.717 5.716 5.719 5.719 0 01-4.645-9.047.318.318 0 00-.255-.511c-1.48-.003-5.008-.001-6.486 0a.323.323 0 00-.257.516 5.672 5.672 0 011.07 3.326 5.719 5.719 0 01-5.716 5.716 5.719 5.719 0 01-5.716-5.716c0-1.239.395-2.386 1.065-3.322z" />
  </svg>
);

const AccountIcon = (props) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 50 50"
    fillRule="evenodd"
    clipRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={2}
    {...props}
  >
    <path d="M19.664 22.332a1.882 1.882 0 00-.719-1.477c-2.497-2.037-4.108-5.313-4.108-9.002C14.837 5.651 19.391.615 25 .615s10.163 5.036 10.163 11.238c0 3.689-1.611 6.965-4.097 9.015-.45.353-.712.892-.712 1.464-.018.042-.018.085-.018.129a1.88 1.88 0 001.259 1.773c6.616 2.371 11.297 8.213 11.297 15.037v7.049c0 1.692-1.305 3.065-2.911 3.065H10.019c-1.606 0-2.911-1.373-2.911-3.065v-7.049c0-6.824 4.681-12.666 11.295-15.043a1.873 1.873 0 001.254-1.767c.007-.044.007-.087.007-.129z" />
  </svg>
);

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const Header = () => {
  const { loading, error, data } = useQuery(GET_CATEGORY_KEYS);
  const hasData = data && data.productCategories && data.productCategories.nodes;
  const router = useRouter();

  // Get toggle-cart-open mutation and number of cart items (for display in cart icon)
  const {
    cartOpen,
    toggleCartOpen,
    cart,
    mobMenuOpen,
    toggleMenuOpen,
    searchOpen,
    toggleSearchOpen,
  } = useContext(AppContext);

  // Get auth token (to decide wether to render link to login or account page)
  // Use null as initial state so that inital render has the same content on server and client
  const [token, setToken] = useState(null);

  // Subscribe to auth token observable to show login-link in the header when the
  // user logs out.
  useEffect(() => {
    const tokenSubscription = auth.authTokenObservable.subscribe({
      next: (newToken) => {
        setToken(newToken);
      },
      error: (err) => {
        console.log(err);
      },
    });
    return () => tokenSubscription.unsubscribe();
  });

  const itemCount = cart !== null && Object.keys(cart).length ? cart.totalProductsCount : 0;

  return (
    <header className="header section">
      {/* Mobile Menu Trigger */}
      <div className="header-inner">
        <div className="burger item-mobile" onClick={toggleMenuOpen} aria-haspopup="true">
          <div className="burger__line line-1"></div>
          <div className="burger__line line-2"></div>
          <div className="burger__line line-3"></div>
        </div>

        {/* ---- Left-of-Logo Menu ---- */}
        <nav className="nav nav--left">
          <ul className="nav__list nav__list--left">
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link">Home</a>
              </Link>
            </li>

            {/*  Shop dropdown menu  */}
            <DropdownMenu
              rightMargin
              // JSX to be passed to DropdownMenu-Component that will trigger menu-open. Cannot use
              // props.children because that contains the dropdown-content.
              trigger={
                <Link href={'/shop/[category]'} as={`/shop/all`}>
                  <a className="nav-link" aria-haspopup="true">
                    Shop
                  </a>
                </Link>
              }
            >
              {/* The content of the dropdown menu is accessible via props.children */}
              <div className="nav__dropdown-content dropdown-content">
                {loading && <div className="nav-dropdown-link">loading...</div>}
                {hasData &&
                  data.productCategories.nodes.map(({ id, name, slug }) => {
                    if (slug === 'uncategorized' || slug === 'all') return ''; // Exclude "uncategorized" and "all" category
                    return (
                      <Link href={'/shop/[category]'} as={`/shop/${slug}`} key={id}>
                        <a className="nav-dropdown-link">{name}</a>
                      </Link>
                    );
                  })}
              </div>
            </DropdownMenu>

            <li className="nav-item">
              <Link href="/about">
                <a className="nav-link">About</a>
              </Link>
            </li>
          </ul>
        </nav>

        {/* ----- Logo ----- */}
        <div className="logo">
          <Link href="/">
            <a className="logo__img">
              <Logo />
            </a>
          </Link>
        </div>

        {/* ----- Right-of-Logo Menu ----- */}
        {/*  Accont/Login dropdown menu  */}
        <nav className="nav nav--right">
          <ul className="nav__list nav__list--right">
            {token ? ( // Show account-icon if user is logged in, login-link otherwise
              <DropdownMenu
                leftMargin
                // JSX to be passed to DropdownMenu-Component that will trigger menu-open. Cannot use
                // props.children because that contains the dropdown-content.
                trigger={
                  <Link href="/myAccount">
                    <a className="nav-link" aria-haspopup="true">
                      <div className="account-icon-wrapper" aria-label="Account">
                        <AccountIcon />
                      </div>
                    </a>
                  </Link>
                }
              >
                {/* The content of the dropdown menu is accessible via props.children */}
                <div className="nav__dropdown-content dropdown-content">
                  <Link href="/myAccount">
                    <a className="nav-dropdown-link">My Account</a>
                  </Link>
                  <div
                    className="nav-dropdown-link"
                    onClick={() => {
                      auth.logoutUser();
                      if (router.pathname === '/myAccount') {
                        Router.push('/login');
                      }
                    }}
                  >
                    Logout
                  </div>
                </div>
              </DropdownMenu>
            ) : (
              <DropdownMenu
                leftMargin
                trigger={
                  <Link href="/login">
                    <a className="nav-link">Login</a>
                  </Link>
                }
              >
                <div className="nav__dropdown-content dropdown-content">
                  <Link href="/login">
                    <a className="nav-dropdown-link">Login</a>
                  </Link>
                  <Link href="/createAccount">
                    <a className="nav-dropdown-link">Create Account</a>
                  </Link>
                </div>
              </DropdownMenu>
            )}

            {/*  Search Trigger  */}
            <li className="nav-item">
              <button
                className="nav-link searchIcon-wrapper"
                onClick={toggleSearchOpen}
                aria-label="Search"
                aria-haspopup="true"
              >
                <SearchIcon />
              </button>
            </li>

            {/*  Cart Modal Trigger  */}
            <li className="nav-item">
              <button
                className="nav-link cartIcon-wrapper"
                onClick={toggleCartOpen}
                aria-label="Cart"
                aria-haspopup="true"
              >
                <CartIcon />
                <div className="cart-item-count">
                  <span className="cart-item-count-text">{itemCount}</span>
                </div>
              </button>
            </li>
          </ul>
        </nav>

        {/*  Mobile Cart Trigger  */}
        <div className="mob-cart item-mobile">
          <div className="nav-link cartIcon-mobile-wrapper" onClick={toggleCartOpen}>
            <CartIcon id="cart-icon-mobile" />
            <div className="cart-item-count cart-item-count-mobile">
              <span className="cart-item-count-text">{itemCount}</span>
            </div>
          </div>
        </div>

        {/*  Lots of Modals  */}
        {mobMenuOpen && <MobileMenu token={token} />}
        {searchOpen && <SearchModal />}
        <CartModal />
      </div>

      <style jsx>{`
        /* ---- wrapper ---- */
        .header {
          flex-direction: column;
          padding: 2rem 0 0 0;
        }

        .header-inner {
          padding: 1rem 2rem 2rem 2rem;

          display: flex;
          justify-content: space-between;

          align-items: center;
          width: 96%;
          max-width: 1500px;
        }

        /* ---- logo ---- */
        .logo {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .logo__img {
          width: 300px;
        }

        /* ---- navigation ---- */
        .nav {
          width: 20vw;
          min-width: 220px;
        }

        .nav ul {
          display: flex;
        }

        .nav .item-mobile {
          display: none;
          width: 25px;
          cursor: pointer;
        }

        .nav .item-mobile a i {
          color: rgb(${colors.orange});
        }

        .nav__list--right {
          justify-content: flex-end;
          align-items: center;
        }

        .nav__list--left {
          justify-content: flex-start;
          align-items: center;
        }

        .nav-item {
          font-family: ${fonts.heading};
        }

        .nav__list--left .nav-item {
          margin: 0 3rem 0 0;
        }

        .nav__list--right .nav-item {
          margin: 0 0 0 3rem;
        }

        .nav-link {
          color: rgb(${colors.orange});
          font-size: 2.4rem;
          cursor: pointer;
          fill: rgb(${colors.orange});
        }

        .nav-dropdown-link {
          color: rgb(${colors.orange});
          font-family: ${fonts.text};
          cursor: pointer;
        }

        .nav-dropdown-link &:hover {
          color: rgb(${colors.lightBlue});
        }

        .dropdown-content {
          display: flex;
          flex-direction: column;
          position: absolute;
        }


        /* ---- Search Icon ---- */
        .searchIcon-wrapper {
          width: 2.8rem;
          height: auto;
        }

        /* ---- Account Icon ---- */
        .account-icon-wrapper {
          width: 2.8rem;
          height: auto;
        }

        /* ---- Cart Icon ---- */
        .cartIcon-wrapper {
          width: 2.8rem;
          height: auto;          
          position: relative;
        }

        .cartIcon-mobile-wrapper {
          width: 3.6rem;
          height: 3.6rem;          
          position: relative;
        }

        .cart-item-count {
          font-family: ${fonts.text};
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          background-color: rgb(${colors.lightblue});
          border-radius: 50%;
          font-size: 1rem;
          right: -10%;
          top: -10%;
          color: rgb(${colors.bg});
        }

        .cart-item-count-mobile {
          width: 2.2rem;
          height: 2.2rem;
          font-size: 1.2rem;
          right: -20%;
        }

        /* ---- burger ---- */
        /*.burger {
           z-index: 1500;
          transition: all 0.5s ease;
        }*/

        .burger__line {
          width: 30px;
          height: 4px;
          margin: 6px;
          background-color: rgb(${colors.orange});
          // transition: all 0.5s ease;
        }

        /* ---- mobile only ---- //
        .item-mobile {
          display: none;
          /*width: 25px;*/
          cursor: pointer;
        }

        .item-mobile a i {
          color: $color-orange;
        }

        /* ---- media queries ---- //
        @media only screen and (max-width: ${breakPoints.bp_md}) {
          .header-inner {
            width: 70%;
          }

          .logo {
            width: 70%;
          }

          .nav {
            display: none;
          }

          .item-mobile {
            display: inline;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_small}) {
          .header-inner {
            width: 90%;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_smallest}) {

        }

        @media only screen and (max-width: ${breakPoints.bp_tiniest}) {
          .header-inner {
            width: 100%;
          }

          .logo {
            width: 60%;
          }
        }

        }

      `}</style>
    </header>
  );
};

export default Header;
