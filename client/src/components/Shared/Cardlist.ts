import { Contents } from "@/types";

interface CardListProps {
    contentsList: Contents[];
}

const BIG_CONTENT_LENGTH = 55;

function CardList({ contentsList }: CardListProps): string {
    const randomContentsList = JSON.parse(JSON.stringify(contentsList));
    randomContentsList.sort(() => 0.5 - Math.random());

    return `
        <div class="content_wrapper">
        <div class="wrapper_block">
            ${randomContentsList
                .map(
                    ({
                        category,
                        link,
                        largeThumbnail,
                        smallThumbnail,
                        title,
                        origin,
                        isBookMarked,
                    }) => {
                        const isBigContent =
                            BIG_CONTENT_LENGTH > 55 ? true : false;
                        return `
            <section class=${
                isBigContent ? "news_single_item" : "news_single_item_small"
            }>
                <div>
                <div onclick="window.open('${link}', '_blank')">
                        <div class="thumb">
                            <img src=${
                                isBigContent
                                    ? `${largeThumbnail}`
                                    : `${smallThumbnail}`
                            } loading="lazy"/>
                        </div>
                        <ul class="info">
                            <li>${category}</li>
                            <li>${origin}</li>
                        </ul>
                        <div class="title">${title}</div>
                    </div>
                </div>
                <div class="item_btns item_bottom">
                    ${
                        isBookMarked
                            ? `<button id=${link}
                                type="button"
                                class="btn_bookmark clicked"
                            ></button>`
                            : `<button id=${link} type="button" class="btn_bookmark"></button>`
                    }
                </div>
            </section>
                `;
                    }
                )
                .join("")}
        </div>
        </div>
    `;
}

export default CardList;
